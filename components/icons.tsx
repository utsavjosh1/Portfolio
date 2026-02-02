export function IconMail({ className = "w-4 h-4" }) {
  return (
    <svg
      className={`${className} draw-icon`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        className="path-mail"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4h16v16H4z"
      />
      <path
        className="path-mail"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4l8 8 8-8"
      />
    </svg>
  );
}

export function IconGithub({ className = "w-5 h-5" }) {
  return (
    <svg
      className={`${className} draw-icon`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        className="path-github"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 7 9.6.5.1.7-.2.7-.5v-2
          c-3 .7-3.6-1.5-3.6-1.5-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6
          1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.2 3 .9.1-.7.4-1.2.7-1.5
          -2.5-.3-5.2-1.3-5.2-5.8 0-1.3.4-2.3 1.1-3.2-.1-.3-.5-1.5.1-3.2
          0 0 .9-.3 3 1.1A10 10 0 0112 6.4c1 0 2-.1 3-.4 2.1-1.4 3-1.1 3-1.1
          .6 1.7.2 2.9.1 3.2.7.9 1.1 1.9 1.1 3.2 0 4.6-2.7 5.5-5.2 5.8
          .4.3.8 1 .8 2v3c0 .3.2.6.7.5 4.1-1.3 7-5 7-9.6C22 6.6 17.5 2 12 2z"
      />
    </svg>
  );
}

export function IconLinkedIn({ className = "w-5 h-5" }) {
  return (
    <svg
      className={`${className} draw-icon`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        className="path-linkedin"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4h4v16H4zM8 8h12v12H8zM8 4a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

export function IconMapPin({ className = "w-3 h-3" }) {
  return (
    <svg
      className={`${className} draw-icon`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        className="path-pin"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z"
      />
      <circle className="path-pin" cx="12" cy="9" r="2.5" strokeWidth="2" />
    </svg>
  );
}

export function IconArrowRight({ className = "w-4 h-4" }) {
  return (
    <svg
      className={`${className} draw-icon`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        className="path-arrow"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M13 6l6 6-6 6"
      />
    </svg>
  );
}

export function IconChevronDown({ className = "w-4 h-4" }) {
  return (
    <svg
      className={`${className} draw-icon`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        className="path-chevron"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 9l6 6 6-6"
      />
    </svg>
  );
}

export function IconDot({ className = "w-3 h-3" }) {
  return (
    <svg
      className={`${className} draw-icon`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <circle className="path-dot" cx="12" cy="12" r="3" strokeWidth="2" />
    </svg>
  );
}
