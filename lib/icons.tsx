// lib/icons.tsx
import { IconProps } from "@/types";

export const icons = {
  calendar: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        d="M22 10H2v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3zM7 8a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1m10 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1"
        opacity={opacity}
      />
      <path d="M19 4h-1v3a1 1 0 0 1-2 0V4H8v3a1 1 0 0 1-2 0V4H5a3 3 0 0 0-3 3v3h20V7a3 3 0 0 0-3-3" />
    </svg>
  ),
  chart: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7 18a1 1 0 0 1-1-1v-4a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1m5 0a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1m5 0a1 1 0 0 1-1-1v-6a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1"
      ></path>
      <path
        fill="currentColor"
        d="M19 2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3M8 17a1 1 0 0 1-2 0v-4a1 1 0 0 1 2 0Zm5 0a1 1 0 0 1-2 0V7a1 1 0 0 1 2 0Zm5 0a1 1 0 0 1-2 0v-6a1 1 0 0 1 2 0Z"
        opacity={opacity}
      ></path>
    </svg>
  ),
  rocket: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m17.737 14.622l-2.426 2.23a11.6 11.6 0 0 1-4.299 2.37l.644 3.004a1 1 0 0 0 1.469.661l3.905-2.202a3.035 3.035 0 0 0 1.375-3.304zM7.266 8.776l2.088-2.48l-2.604-.628a2.78 2.78 0 0 0-3.387 1.357l-2.2 3.9a1 1 0 0 0 .661 1.469l3.073.659a12.9 12.9 0 0 1 2.369-4.277m9.468.04a1.5 1.5 0 1 0-1.5-1.5a1.5 1.5 0 0 0 1.5 1.5"
      ></path>
      <path
        fill="currentColor"
        d="M22.601 2.062a1 1 0 0 0-.713-.713A11.25 11.25 0 0 0 10.47 4.972L7.266 8.776a12.94 12.94 0 0 0-2.924 6.71a1 1 0 0 0 .284.837l3.1 3.1a1 1 0 0 0 .708.293l.086-.004a11.85 11.85 0 0 0 6.79-2.86l3.664-3.368A11.2 11.2 0 0 0 22.6 2.062Zm-5.867 6.754a1.5 1.5 0 1 1 1.5-1.5a1.5 1.5 0 0 1-1.5 1.5"
        opacity={opacity}
      ></path>
    </svg>
  ),
  paypal: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M8.882 19.94a1 1 0 0 1-.988.843H4.062a1.533 1.533 0 0 1-1.515-1.785l2.59-16.406A1.89 1.89 0 0 1 7 1h6.214c2.56 0 4.408.62 5.492 1.843a4.96 4.96 0 0 1 1.08 4.395c-.021.135-.043.27-.075.418c-.823 4.218-3.655 6.457-8.186 6.457H9.807zm-4.36-.628l-.001.006zM7.113 2.897v.002z"
        opacity={opacity}
      ></path>
      <path
        fill="currentColor"
        d="M20.437 7.104a4 4 0 0 0-.545-.508a5 5 0 0 1-.106.642c-.021.135-.043.27-.075.418c-.823 4.218-3.655 6.457-8.186 6.457H9.807l-.925 5.827a1 1 0 0 1-.988.843H6.727l-.082.52A1.467 1.467 0 0 0 8.093 23h3.234a1.76 1.76 0 0 0 1.751-1.469l.64-4.031l.012-.055h.298c4.033 0 6.551-1.993 7.286-5.762a5.15 5.15 0 0 0-.877-4.578"
      ></path>
    </svg>
  ),
  lockAlt: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9 7a3 3 0 1 1 6 0v2h2V7A5 5 0 0 0 7 7v2h2zm3 11a1 1 0 0 1-1-1v-3a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1"
        opacity={opacity}
      ></path>
      <path
        fill="currentColor"
        d="M17 9H7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3m-4 8a1 1 0 0 1-2 0v-3a1 1 0 1 1 2 0z"
      ></path>
    </svg>
  ),
  telegramAlt: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M17.688 21.744a2.02 2.02 0 0 1-1.242-.427l-4.03-3.122l-2.702 2.983a1 1 0 0 1-1.698-.383l-2.02-6.682l-3.626-1.26a2.042 2.042 0 0 1-.103-3.818L20.187 1.8a2.042 2.042 0 0 1 2.771 2.295L19.695 20.11a2.054 2.054 0 0 1-2.008 1.633Z"
        opacity={opacity}
      ></path>
      <path
        fill="currentColor"
        d="M8.973 21.506a1 1 0 0 1-.957-.71l-2.168-7.16a1 1 0 0 1 .495-1.176L16.91 6.958a1 1 0 0 1 1.17 1.594l-7.084 7.083l-1.044 5.072a1 1 0 0 1-.933.798z"
      ></path>
    </svg>
  ),
  chevronUp: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeDasharray={12}
        strokeDashoffset={12}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8l-7 7M12 8l7 7"
        opacity={opacity}
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.3s"
          values="12;0"
        ></animate>
      </path>
    </svg>
  ),
  chevronLeft: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m15 6l-6 6l6 6"
        opacity={opacity}
      ></path>
    </svg>
  ),
  chevronRight: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m9 6l6 6l-6 6"
        opacity={opacity}
      ></path>
    </svg>
  ),
  chevronDown: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeDasharray={12}
        strokeDashoffset={12}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 16l-7 -7M12 16l7 -7"
        opacity={opacity}
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.3s"
          values="12;0"
        ></animate>
      </path>
    </svg>
  ),
  dinosaur: ({ opacity = 0.5, ...props }: IconProps) => (
    <svg
      width="55px"
      height="86px"
      viewBox="13 0 285 306"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        id="Group-3"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        transform="translate(13.000000, 0.000000)"
        opacity={opacity}
      >
        <polygon
          id="Path"
          fill="#666666"
          points="256.351585 91.6642857 213.916427 91.6642857 213.916427 80.0385714 284.492795 80.0385714 284.492795 14.3085714 270.198847 14.3085714 270.198847 0 155.400576 0 155.400576 14.3085714 141.553314 14.3085714 141.553314 105.972857 127.259366 105.972857 127.259366 119.834286 106.26513 119.834286 106.26513 134.142857 85.2708934 134.142857 85.2708934 148.451429 70.9769452 148.451429 70.9769452 162.312857 45.0691643 162.312857 45.0691643 148.004286 31.221902 148.004286 31.221902 134.142857 16.9279539 134.142857 16.9279539 105.972857 0.847262248 105.972857 0.847262248 192.718571 14.6945245 192.718571 14.6945245 207.027143 28.9884726 207.027143 28.9884726 220.888571 42.8357349 220.888571 42.8357349 235.197143 57.129683 235.197143 57.129683 249.058571 70.9769452 249.058571 70.9769452 305.398571 101.351585 305.398571 101.351585 289.301429 87.5043228 289.301429 87.5043228 277.228571 101.351585 277.228571 101.351585 263.367143 115.645533 263.367143 115.645533 249.058571 127.259366 249.058571 127.259366 263.367143 141.553314 263.367143 141.553314 305.398571 171.927954 305.398571 171.927954 289.301429 157.634006 289.301429 157.634006 235.197143 171.927954 235.197143 171.927954 220.888571 185.775216 220.888571 185.775216 199.872857 200.069164 199.872857 200.069164 150.687143 211.682997 150.687143 211.682997 164.548571 228.210375 164.548571 228.210375 134.142857 200.069164 134.142857 200.069164 108.208571 256.351585 108.208571"
        />
        <rect
          id="Rectangle"
          fill="#FFFFFF"
          x="169.247839"
          y="20.5685714"
          width="16.9740634"
          height="16.9914286"
        />
      </g>
    </svg>
  ),
  close: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" fillRule="evenodd" opacity={opacity}>
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
        <path
          fill="currentColor"
          d="m12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586L6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z"
        ></path>
      </g>
    </svg>
  ),
  cart: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M1.289 2.763a.75.75 0 0 1 .948-.475l.265.089l.04.013c.626.209 1.155.385 1.572.579c.442.206.826.46 1.117.865c.291.403.412.848.467 1.333c.052.456.052 1.014.052 1.674V9.5c0 1.435.002 2.437.103 3.192c.099.734.28 1.122.556 1.399c.277.277.666.457 1.4.556c.755.101 1.756.103 3.191.103h7a.75.75 0 1 1 0 1.5h-7.055c-1.367 0-2.47 0-3.337-.117c-.9-.12-1.658-.38-2.26-.981c-.601-.602-.86-1.36-.981-2.26c-.117-.867-.117-1.97-.117-3.337V6.883c0-.713 0-1.185-.042-1.546c-.04-.342-.107-.507-.194-.626c-.086-.12-.221-.237-.533-.382c-.33-.153-.777-.304-1.453-.53l-.265-.088a.75.75 0 0 1-.474-.948"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M5.745 6q.006.39.005.841V9.5c0 1.435.002 2.437.103 3.192q.023.165.05.308h10.12c.959 0 1.438 0 1.814-.248s.565-.688.942-1.57l.43-1c.809-1.89 1.213-2.833.769-3.508S18.506 6 16.45 6z"
        opacity={opacity}
      ></path>
      <path
        fill="currentColor"
        d="M7.5 18a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M18 19.5a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0"
      ></path>
    </svg>
  ),
  card: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      {...props}
    >
      <path
        fill="currentColor"
        d="M10 20h4c3.771 0 5.657 0 6.828-1.172S22 15.771 22 12c0-.442-.002-1.608-.004-2H2c-.002.392 0 1.558 0 2c0 3.771 0 5.657 1.171 6.828S6.23 20 10 20"
        opacity={opacity}
      ></path>
      <path
        fill="currentColor"
        d="M9.995 4h4.01c3.781 0 5.672 0 6.846 1.116c.846.803 1.083 1.96 1.149 3.884v1H2V9c.066-1.925.303-3.08 1.149-3.884C4.323 4 6.214 4 9.995 4M12.5 15.25a.75.75 0 0 0 0 1.5H14a.75.75 0 0 0 0-1.5zm-6.5 0a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5z"
      ></path>
    </svg>
  ),
  bell: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.8 25.8 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.4 4.4 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7"
        opacity={opacity}
      ></path>
      <path
        fill="currentColor"
        d="M7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0"
      ></path>
    </svg>
  ),
  bag: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.574 4.691c-.833.692-1.053 1.862-1.492 4.203l-.75 4c-.617 3.292-.925 4.938-.026 6.022C4.206 20 5.88 20 9.23 20h5.54c3.35 0 5.024 0 5.924-1.084s.59-2.73-.026-6.022l-.75-4c-.44-2.34-.659-3.511-1.492-4.203C17.593 4 16.402 4 14.02 4H9.98c-2.382 0-3.573 0-4.406.691m4.304 3.06a2.251 2.251 0 0 0 4.245 0a.75.75 0 0 1 1.414.499a3.751 3.751 0 0 1-7.073 0a.75.75 0 1 1 1.414-.5"
        clipRule="evenodd"
        opacity={opacity}
      ></path>
    </svg>
  ),
  archive: ({ size = 24, opacity = 0.5, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M11.5 21h1c3.771 0 5.657 0 6.828-1.172S20.5 16.771 20.5 13V6.998C20.355 7 20.15 7 20 7H4c-.15 0-.355 0-.5-.002V13c0 3.771 0 5.657 1.172 6.828S7.729 21 11.5 21m3.56-9.5a.75.75 0 0 0-1.12-1l-3.011 3.374l-.87-.974a.75.75 0 0 0-1.118 1l1.428 1.6a.75.75 0 0 0 1.119 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M2 5c0-.943 0-1.414.293-1.707S3.057 3 4 3h16c.943 0 1.414 0 1.707.293S22 4.057 22 5s0 1.414-.293 1.707S20.943 7 20 7H4c-.943 0-1.414 0-1.707-.293S2 5.943 2 5"
        opacity={opacity}
      ></path>
    </svg>
  ),
};

// Create PascalCase aliases dynamically (runtime usage)
const pascalCase = (str: string) =>
  str.replace(/(^\w|-\w)/g, (match) => match.replace("-", "").toUpperCase());

const componentMap = Object.entries(icons).reduce((acc, [key, component]) => {
  acc[pascalCase(key)] = component;
  return acc;
}, {} as Record<string, React.FC<IconProps>>);

export const {
  Calendar,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Dinosaur,
  Close,
  Cart,
  Card,
  Bell,
  Bag,
  Archive,
} = componentMap;
