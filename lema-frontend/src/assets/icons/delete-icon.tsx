import { SVGProps } from "react";

export const DeleteIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 9H16.5"
        stroke="#F9566A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 9V16C15.5 16.5 15 17 14.5 17H9.5C9 17 8.5 16.5 8.5 16V9"
        stroke="#F9566A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9V8C10 7.5 10.5 7 11 7H13C13.5 7 14 7.5 14 8V9"
        stroke="#F9566A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 11.5V14.5"
        stroke="#F9566A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 11.5V14.5"
        stroke="#F9566A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
