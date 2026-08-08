"use client";

import { useState, type FormEvent } from "react";

/**
 * The waitlist pill.
 *
 * One white capsule holding a borderless field and a dark submit, with the
 * button inset by the pill's own 4px padding on three sides — which is why the
 * left padding is 18px and the right is 4px. Figma pins the pill to 414px from
 * the tablet up and gives it the column's full width on the phone.
 *
 * The field carries no focus ring of its own, as drawn. Rather than leave a
 * keyboard user with nothing, the ring goes on the pill via
 * `has-[input:focus-visible]` — same affordance, and it outlines the control the
 * user actually perceives instead of a borderless box inside it.
 */
export const EmailCapture = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-keep-out="box"
      className="flex w-full items-center gap-[20px] rounded-[100px] bg-white py-[4px] pr-[4px] pl-[18px] shadow-[0px_3px_1.5px_rgba(0,0,0,0.05),0px_1px_0.5px_rgba(0,0,0,0.15)] has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-[#1a1a1a] ipad:w-[414px]"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        aria-label="Email address"
        className="min-w-0 flex-1 appearance-none bg-transparent p-0 font-tight text-[16px] font-medium tracking-[-0.02em] text-[#707070] outline-none placeholder:text-[#707070]"
      />
      {/*
        Figma draws the button 43px tall — 12px padding around an 18px icon,
        plus the 1px top bevel. `min-h-11` lifts it the last pixel to the 44px
        touch floor; the pill grows with it and nothing else on the page moves.

        Hover is a background change rather than the house `hover:opacity-90`,
        because the design specifies the darker fill and fading a near-black
        capsule against #f6f5f1 reads as a bug rather than as feedback.
      */}
      <button
        type="submit"
        className="inline-flex min-h-11 shrink-0 cursor-pointer touch-manipulation items-center justify-center gap-[4px] rounded-[100px] border-t border-t-[rgba(255,255,255,0.15)] bg-[#1a1a1a] py-[12px] pr-[12px] pl-[16px] whitespace-nowrap shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.3)] transition-[background-color,transform] duration-200 ease-out [-webkit-tap-highlight-color:transparent] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a1a] active:scale-[0.97] motion-reduce:active:scale-100 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#2b2b2b]"
      >
        <span className="font-tight text-[15px] font-medium tracking-[-0.02em] text-white [text-shadow:0px_1px_1px_rgba(0,0,0,0.15),0px_3px_3px_rgba(0,0,0,0.05)]">
          Join waitlist
        </span>
        <img
          src="/section-42/arrow.svg"
          alt=""
          aria-hidden
          className="block size-[18px] max-w-none"
        />
      </button>
    </form>
  );
};
