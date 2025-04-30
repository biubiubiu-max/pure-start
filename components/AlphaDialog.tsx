import React, {useEffect} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {GithubIcon} from "lucide-react";
import Link from "next/link";
import {useAppDispatch} from "@/hooks/redux";

const AlphaDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isOpen) {
      dispatch({
        type: 'bookmarkSettings/changeIsSlideBlocked',
        payload: true
      })
    } else {
      dispatch({
        type: 'bookmarkSettings/changeIsSlideBlocked',
        payload: false
      })
    }
  }, [dispatch, isOpen])
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <DialogTrigger asChild>
          <div
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm h-9 w-9 rounded-full bg-background/20 backdrop-blur-lg border border-white/10 text-white hover:bg-white/20 hover:text-white"
            onClick={() => setIsOpen(true)}
          >
            <GithubIcon/>
          </div>
        </DialogTrigger>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            这是一个 Alpha 版本
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4">
              这是一个 Alpha 版本，正处于开发初期阶段，但是作者会长期维护
              <br/>
              由于作者最近十分繁忙，无力继续更新，最近的更新可能放缓，但是十分欢迎大家提出问题和建议，在
              Github 上发表 Issue 和 PR
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>OK</Button>
          <Link href={"https://github.com/biubiubiu-max/pure-start"} target={"_blank"}>
            <Button>
              <GithubIcon/>
              <span> 带我去 Github 项目主页 </span>
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlphaDialog;
