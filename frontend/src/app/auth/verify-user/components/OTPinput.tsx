import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function OTPinput() {
  return (
    <div className="bg-gray-200 h-[200px] flex items-center justify-center flex-col">
      <InputOTP maxLength={6} autoComplete="one-time-code" className="">
        <InputOTPGroup>
          <InputOTPSlot
            index={0}
            className=" border-[2px] border-foreground border-r-0 h-[50px] w-[50px]"
          />
          <InputOTPSlot
            index={1}
            className=" border-[2px] border-foreground border-r-0 h-[50px] w-[50px]"
          />
          <InputOTPSlot
            index={2}
            className=" border-[2px] border-foreground border-r-1 h-[50px] w-[50px]"
          />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot
            index={3}
            className=" border-[2px] border-foreground border-r-0 h-[50px] w-[50px]"
          />
          <InputOTPSlot
            index={4}
            className=" border-[2px] border-foreground border-r-0 h-[50px] w-[50px]"
          />
          <InputOTPSlot
            index={5}
            className=" border-[2px] border-foreground border-r-1 h-[50px] w-[50px]"
          />
        </InputOTPGroup>
      </InputOTP>
      <Button className="w-[80%] my-4">Verify</Button>
    </div>
  );
}
