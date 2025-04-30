"use client"

import {useState, useEffect, useRef} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {Search} from "lucide-react"
import {Input} from "@/components/ui/input"
import {cn} from "@/lib/utils"
import SettingsDialog from "@/components/settings/SettingsDialog"
import {useAppSelector, useAppDispatch} from "@/hooks/redux"
import SuggestionsList from "@/components/search/SuggestionsList"
import {WeatherIndicator} from "@/components/weather/WeatherIndicator"
import BookMarkSection from "@/components/bookmark/BookMarkSection";
import {toast} from "sonner";
import AlphaDialog from "@/components/AlphaDialog";
import baseBgIMG from '@/assets/006.webp';
import AppPageTimer from "@/components/home/AppPageTimer";

export default function ElegantStartPage() {
  const [time] = useState(new Date())
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const searchBar = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const switcherRef = useRef<HTMLDivElement>(null);
  const [isEngineSwitcherOpen, setIsEngineSwitcherOpen] = useState(false)

  const dispatch = useAppDispatch();

  const bookmark = useAppSelector(state => state.bookmark);

  const saveToRecent = (term: string) => {
    if (!search.isSaveSearchHistory) {
      return;
    }
    try {
      const saved = localStorage.getItem("recentSearches")
      let searches = saved ? JSON.parse(saved) : []
      searches = searches.filter((s: string) => s !== term)
      searches.unshift(term)
      searches = searches.slice(0, 5)
      localStorage.setItem("recentSearches", JSON.stringify(searches))
    } catch (error) {
      console.error("Failed to save recent search:", error)
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [suggestionsRef]);

  const appearance = useAppSelector((state) => state.appearance)
  const clock = useAppSelector((state) => state.clock)
  const search = useAppSelector((state) => state.search)
  const background = useAppSelector((state) => state.background)

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      // 这里 ctrl+k 或 cmd+k 触发搜索框聚焦
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchFocused(true)
      }
    })
  })

  useEffect(() => {
    dispatch({
      type: 'backgroundSettings/changeBackgroundType',
      payload: background.backgroundType,
    })
  }, [dispatch, background.backgroundType]);

  useEffect(() => {
    if (appearance.isDarkModeFollowSystem) {
      // Check system preference for dark mode
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setIsDarkMode(true)
        document.documentElement.classList.add("dark")
      } else {
        setIsDarkMode(false)
        document.documentElement.classList.remove("dark")
      }
    } else {
      // console.log(appearance.isDarkMode)
      setIsDarkMode(appearance.isDarkMode)
      document.documentElement.classList.toggle("dark", appearance.isDarkMode)
    }
    if (appearance.primaryColor) {
      document.documentElement.style.setProperty("--primary", appearance.primaryColor)
    }
  }, [appearance.isDarkMode, appearance.isDarkModeFollowSystem, appearance.primaryColor])

  function getTimeGreeting(hour: number) {
    // 核心时间问候逻辑（可扩展）
    if (hour < 5) return "凌晨好！夜深了，注意休息~"
    if (hour < 9) return "清晨好！新的一天从元气满满开始！"
    if (hour < 12) return "上午好！保持专注，工作效率++！"
    if (hour === 12) return "中午好！享用美味午餐吧！"
    if (hour < 14) return "午后时光，适当小憩更精神哦"
    if (hour < 17) return "下午好！喝杯茶保持战斗力 💪"
    if (hour < 19) return "傍晚好！晚霞很美，记得看看窗外"
    if (hour < 22) return "晚上好！今天有新的收获吗？"
    return "夜深了，让眼睛好好休息吧"
  }

  const extraTips = {
    10: "🕙 整点提示：起身活动一下吧",
    15: "☕ 下午茶时间到！",
    20: "📖 晚间阅读时间",
    23: "🌙 请关闭强光准备入睡"
  };

  function getGreeting() {
    const hour = time.getHours();
    const base = getTimeGreeting(hour);
    const tip = extraTips[hour as keyof typeof extraTips] || "";
    return [base, tip].filter(Boolean).join("\n");
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveToRecent(searchValue);
    if (searchValue.trim()) {
      // 使用当前选择的搜索引擎
      const searchEngine = search.searchEngineList.find((engine) => engine.name === search.defaultSearchEngine);
      if (searchEngine) {
        window.open(`${searchEngine.url}${encodeURIComponent(searchValue)}`, "_blank");
      } else {
        // fallback to Google search
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchValue)}`, "_blank");
      }
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center p-4 transition-colors duration-500",
        isDarkMode ? "dark" : "",
      )}
    >
      {/* Background with overlay */}
      <div className="fixed inset-0 z-[-1]">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b",
            searchFocused ? "from-black/40 to-black/70" : "from-black/30 to-black/60",
          )}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={background.photo.url}
          alt="Background"
          className="w-full h-full object-cover"
          style={{
            filter: `blur(${background.backgroundBlur}px)`,
            opacity: background.backgroundOpacity / 100,
          }}
          onError={() => {
            console.log("Failed to load background image")
            toast("图片加载失败", {
              description: "背景图片加载失败，点击切换到默认背景",
              action: {
                label: "切换",
                onClick: () => {
                  dispatch({
                    type: 'backgroundSettings/changePhotoUrl',
                    payload: baseBgIMG.src,
                  })
                  location.reload();
                },
              },
            })
          }}
        />
      </div>

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
        className="w-full max-w-3xl space-y-12 z-10"
      >
        {/*/!* Dark mode toggle *!/*/}
        {/*<motion.button*/}
        {/*    className="absolute top-6 right-6 p-2 rounded-full bg-background/20 backdrop-blur-lg border border-white/10 text-white"*/}
        {/*    whileHover={{scale: 1.05}}*/}
        {/*    whileTap={{scale: 0.95}}*/}
        {/*    onClick={toggleDarkMode}*/}
        {/*>*/}
        {/*    {isDarkMode ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}*/}
        {/*</motion.button>*/}

        {/* Alpha button */}
        <div className="fixed bottom-20 right-6 z-10">
          <AlphaDialog/>
        </div>

        {/* Settings button */}
        <div className="fixed bottom-6 right-6 z-10">
          <SettingsDialog/>
        </div>

        {/* Time and greeting section */}
        <div
          className={cn(
            "text-center space-y-4",
            searchFocused ? "opacity-70 blur-sm" : "opacity-100",
            "transition-opacity duration-200",
          )}
        >
          <motion.h2
            className="text-lg font-medium text-white/80"
            initial={{y: -20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.2, duration: 0.6}}
          >
            {getGreeting()}
          </motion.h2>

          {clock.isClockShow && (<AppPageTimer/>)}

          <motion.div
            className="flex items-center justify-center text-sm text-white/70"
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.3, duration: 0.6}}
          >
            {
              clock.isClockShow && (
                <motion.p
                  className="text-sm text-white/70"
                  initial={{y: 20, opacity: 0}}
                  animate={{y: 0, opacity: 1}}
                  transition={{delay: 0.3, duration: 0.6}}
                >
                  {time.toLocaleDateString([], {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </motion.p>
              )
            }
            <WeatherIndicator/>
          </motion.div>
        </div>

        {/* Search bar */}
        <div className="relative mx-auto max-w-lg" ref={searchBar}>
          <motion.form
            initial={false}
            animate={searchFocused ? {scale: 1.02} : {scale: 1}}
            transition={{duration: 0.2}}
            onSubmit={handleSearch}
          >
            <motion.div
              className="absolute -top-6 left-0 right-0 text-center text-xs text-white/50"
              initial={{opacity: 0}}
              animate={{opacity: searchFocused ? 1 : 0}}
            >
              按下 <kbd>Enter</kbd> 或点击建议项目来搜索, 当前使用 {search.defaultSearchEngine}{
              !search.isSuggestionsShow && "，当前搜索建议已关闭"
            }
            </motion.div>
            <Input
              type="text"
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
              placeholder="探索未知..."
              className="w-full pl-16 pr-4 py-6 rounded-xl bg-background/20 backdrop-blur-xl border-white/10 text-white placeholder:text-white/50 focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all duration-200"
              onFocus={() => {
                setSearchFocused(true);
                // 移动设备移动到 #search-bar
                if (window.innerWidth < 640) {
                  searchBar.current?.scrollIntoView({behavior: "smooth"});
                }
              }}
            />

            {/* Search Icon with Engine Switcher */}
            <div ref={switcherRef} className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <motion.div
                className="relative cursor-pointer"
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.95}}
                onClick={() => setIsEngineSwitcherOpen(!isEngineSwitcherOpen)}
              >
                <Search className="text-white/70 w-6 h-6"/>

                {/* Small engine indicator */}
                <motion.div
                  className={cn(
                    "absolute -bottom-1 -right-4 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold text-white/20",
                  )}
                  initial={{scale: 0}}
                  animate={{scale: 1}}
                  transition={{type: "spring", stiffness: 500, damping: 15}}
                >
                  {search.defaultSearchEngine[0].toUpperCase() + search.defaultSearchEngine.substring(1)}
                </motion.div>
              </motion.div>
            </div>
          </motion.form>
          {/* Engine Switcher Dropdown */}
          <AnimatePresence>
            {isEngineSwitcherOpen && (
              <motion.div
                initial={{opacity: 0, y: -5, scale: 0.95}}
                animate={{opacity: 1, y: 5, scale: 1}}
                exit={{opacity: 0, y: -5, scale: 0.95}}
                transition={{type: "spring", stiffness: 500, damping: 30}}
                className="absolute top-full left-0 z-50 bg-background/70 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg overflow-hidden w-40"
              >
                <div className="py-1 z-50">
                  {search.searchEngineList.map((engine) => (
                    <motion.button
                      key={engine.name}
                      whileHover={{backgroundColor: "rgba(255, 255, 255, 0.1)"}}
                      whileTap={{scale: 0.98}}
                      onClick={(e) => {
                        e.preventDefault()
                        dispatch({
                          type: "searchSettings/changeDefaultSearchEngine",
                          payload: engine.name,
                        })
                        setIsEngineSwitcherOpen(false)
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground/90"
                    >
                      {/*<motion.div*/}
                      {/*    className={cn(*/}
                      {/*        "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",*/}
                      {/*)}*/}
                      {/*>*/}
                      {/*    {engine.name}*/}
                      {/*</motion.div>*/}
                      <span>{engine.name}</span>
                      {search.defaultSearchEngine === engine.name && (
                        <motion.div initial={{scale: 0}} animate={{scale: 1}}
                                    className="ml-auto">
                          <div className="w-2 h-2 rounded-full bg-white/70"/>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {
            searchFocused && (
              <div ref={suggestionsRef}>
                <SuggestionsList searchValue={searchValue}/>
              </div>
            )
          }
        </div>
        {
          bookmark.showBookmark && <BookMarkSection searchFocused={searchFocused}/>
        }
      </motion.div>
    </div>
  )
}

