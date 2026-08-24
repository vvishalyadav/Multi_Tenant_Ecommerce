import Image from "next/image";
import { Button } from "@/app/(app)/components/ui/button";
import { Input } from "@/app/(app)/components/ui/input";
import { Checkbox } from "@/app/(app)/components/ui/checkbox";
import { Textarea } from "@/app/(app)/components/ui/textarea";
import { Progress } from "@/app/(app)/components/ui/progress";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-5 bg-zinc-50 h-full">
      <Button variant="elevated" className={'p-6 text-lg w-sm'}>I am a Button</Button>
      <Input placeholder="I am a input"  className="p-2  w-sm h-10 "/>
      <Progress value={50} className={'w-sm'}/>

      <Textarea className="w-sm "></Textarea>
      <Checkbox className={' size-5'}></Checkbox>
    </div>
  );
}
