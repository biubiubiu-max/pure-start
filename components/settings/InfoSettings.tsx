import React from 'react';
import Image from "next/image";
import logoUrl from "@/assets/logo.png";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {ExternalLink, Github, Heart, Mail, MessageSquare, Users} from "lucide-react";
import {Button} from "@/components/ui/button";
import {version}  from '../../package.json';

const InfoSettings = () => {
  const runToGithubProject = () => {
    window.open('https://github.com/biubiubiu-max/pure-start', 'github_pure-start')
  }
    return (
        <div className="mt-0 space-y-6">
            <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                    <Image
                        src={logoUrl}
                        alt="项目Logo"
                        width={200}
                        height={200}
                        className="rounded-xl"
                    />
                </div>
                <h1 className="text-2xl font-bold"> 摒弃繁杂，唯有纯粹 </h1>
                <p className="text-sm text-muted-foreground max-w-md mt-2">
                    一个简洁、高效的起始页，使用现代化设计，帮助你专注于工作和学习
                </p>
                <div className="flex items-center gap-2 mt-2 justify-center">
                    {/*<p className="text-[0.75em]"> 由 grtsinry43 筑之以 ❤️</p>*/}

                    {/*<Badge variant="outline"*/}
                    {/*       className="text-xs flex items-center gap-1">*/}
                    {/*    <Star className="h-3 w-3"/> 4.8/5*/}
                    {/*</Badge>*/}
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border rounded-lg shadow-sm bg-background/50">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary"/>
                            <h2 className="text-lg font-semibold"> 关于我 </h2>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            五年专注前端开发，以代码勾勒数字世界的骨骼与肌理；方向盘在手时，便是追逐地平线的自由旅人。享受架构逻辑的严谨，也迷恋公路延伸的未知——二者皆是探索的浪漫。
                            {/*<div className="flex items-center gap-2 mt-2">*/}
                            {/*    <span> 了解更多：</span>*/}
                            {/*    <Link href="https://blog.grtsinry43.com/about"*/}
                            {/*          target="_blank">*/}
                            {/*        <span*/}
                            {/*            className="text-primary hover:underline transition-colors">*/}
                            {/*            个人博客*/}
                            {/*        </span>*/}
                            {/*    </Link>*/}
                            {/*    <ExternalLink size={10}/>*/}
                            {/*</div>*/}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Badge
                                className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"> 用户体验 </Badge>
                            <Badge
                                className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"> 生产力工具 </Badge>
                            <Badge
                                className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"> 全栈开发 </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border rounded-lg shadow-sm bg-background/50">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary"/>
                            <h2 className="text-lg font-semibold"> 联系我 </h2>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <a
                                href="mailto:jf@whatmin.com"
                                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                            >
                                <Mail className="h-4 w-4"/>
                                <span>jf@whatmin.com</span>
                            </a>
                            {/*<a*/}
                            {/*    href="https://www.grtsinry43.com"*/}
                            {/*    target="_blank"*/}
                            {/*    rel="noopener noreferrer"*/}
                            {/*    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"*/}
                            {/*>*/}
                            {/*    <LinkIcon className="h-4 w-4"/>*/}
                            {/*    <span> 我的个人主页 </span>*/}
                            {/*</a>*/}
                            {/*<a*/}
                            {/*    href="https://blog.grtsinry43.com"*/}
                            {/*    target="_blank"*/}
                            {/*    rel="noopener noreferrer"*/}
                            {/*    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"*/}
                            {/*>*/}
                            {/*    <LinkIcon className="h-4 w-4"/>*/}
                            {/*    <span>Grtsinry43&#39;s Blog</span>*/}
                            {/*</a>*/}
                            <a
                                href="https://github.com/biubiubiu-max"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                            >
                                <Github className="h-4 w-4"/>
                                <span>github.com/biubiubiu-max</span>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border rounded-lg shadow-sm bg-background/50">
                <CardContent className="p-6">
                    <div
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Heart className="h-4 w-4 text-red-500"/>
                                支持我
                            </h3>
                            <p className="text-sm text-muted-foreground"> 如果您喜欢这个项目，还麻烦您给一个星标或分享给您的朋友 </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm"
                                    onClick={runToGithubProject}
                                    className="flex items-center gap-1">
                                <Github className="h-4 w-4"/>
                                <span>Star</span>
                            </Button>
                            <Button variant="outline" size="sm"
                                    className="flex items-center gap-1">
                                <ExternalLink className="h-4 w-4"/>
                                <span> 分享 </span>
                            </Button>
                            {/*<Button variant="default" size="sm">*/}
                            {/*    支持我们 */}
                            {/*</Button>*/}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="text-center text-xs text-muted-foreground mt-8">
                <p>© 2025 whatmin 保留所有权利。<Badge variant="secondary" className="text-xs">
                    版本 {version}-alpha
                </Badge></p>

                {/*<div className="flex items-center justify-center gap-4 mt-2">*/}
                {/*    <a href="#" className="hover:text-primary transition-colors">*/}
                {/*        隐私政策 */}
                {/*    </a>*/}
                {/*    <a href="#" className="hover:text-primary transition-colors">*/}
                {/*        使用条款 */}
                {/*    </a>*/}
                {/*    <a href="#" className="hover:text-primary transition-colors">*/}
                {/*        帮助中心 */}
                {/*    </a>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default InfoSettings;
