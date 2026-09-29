export function Landscape() {
  return (
    <svg
      className="landscape"
      viewBox="0 0 720 720"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="sky" x2="0" y2="720" gradientUnits="userSpaceOnUse">
          <stop stopColor="#173944" />
          <stop offset="1" stopColor="#081b25" />
        </linearGradient>
        <linearGradient
          id="river"
          x1="360"
          y1="330"
          x2="430"
          y2="720"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8ae1cf" />
          <stop offset="1" stopColor="#257788" />
        </linearGradient>
        <radialGradient id="moon">
          <stop stopColor="#cce8c8" stopOpacity=".18" />
          <stop offset="1" stopColor="#cce8c8" stopOpacity="0" />
        </radialGradient>
        <g id="pine">
          <path
            d="M0 0 -22 42 -13 42 -32 68 -17 68 -40 99 40 99 17 68 32 68 13 42 22 42Z"
            fill="currentColor"
          />
          <path d="M0 82V118" stroke="currentColor" strokeWidth="8" />
        </g>
      </defs>
      <path fill="url(#sky)" d="M0 0h720v720H0z" />
      <circle cx="485" cy="170" r="200" fill="url(#moon)" />
      <circle cx="485" cy="170" r="35" fill="#d8dfbb" opacity=".9" />
      <g fill="#afdfda" opacity=".55">
        <circle cx="90" cy="100" r="2" />
        <circle cx="240" cy="150" r="1.5" />
        <circle cx="560" cy="75" r="1.5" />
        <circle cx="350" cy="70" r="2" />
        <circle cx="640" cy="230" r="2" />
      </g>
      <path
        d="M0 370 130 204 223 304 330 156 473 348 590 244 720 361V720H0Z"
        fill="#284953"
      />
      <path
        d="m282 224 48-68 59 79-56-27-17 23-14-19Z"
        fill="#7b9b9b"
        opacity=".6"
      />
      <path
        d="M0 403 143 341 257 406 406 294 567 375 720 323V720H0Z"
        fill="#245455"
      />
      <path d="M0 467Q155 371 281 430T720 407V720H0Z" fill="#1b4144" />
      <path
        d="M410 343C289 405 459 422 379 470S271 535 379 573 443 671 288 720H462C564 652 507 592 429 555S382 508 429 467 336 402 410 343Z"
        fill="url(#river)"
        opacity=".8"
      />
      <path
        d="M0 556Q123 442 262 487L323 544 241 598 317 720H0Z"
        fill="#163b36"
      />
      <path d="M720 458Q575 450 491 543L547 595 489 720H720Z" fill="#12322f" />
      <path
        d="M80 720C130 635 215 664 212 584S249 535 276 498"
        stroke="#cbb981"
        strokeWidth="13"
        opacity=".7"
      />
      <g color="#0d2b2b">
        <use href="#pine" transform="translate(72 355) scale(1.5)" />
        <use href="#pine" transform="translate(145 396) scale(.9)" />
        <use href="#pine" transform="translate(39 460) scale(1.8)" />
        <use href="#pine" transform="translate(641 375) scale(1.6)" />
        <use href="#pine" transform="translate(565 430) scale(.8)" />
        <use href="#pine" transform="translate(697 454) scale(2)" />
      </g>
      <g color="#315e4f">
        <use href="#pine" transform="translate(192 439) scale(.6)" />
        <use href="#pine" transform="translate(302 380) scale(.55)" />
        <use href="#pine" transform="translate(491 384) scale(.65)" />
      </g>
      <g stroke="#b2c8ae" strokeWidth="2">
        <path d="M247 503v-47h49v47" fill="#3d6257" />
        <path d="m237 460 35-32 34 32Z" fill="#71857a" />
        <path d="M267 503v-22h11v22" fill="#f2ce78" stroke="none" />
      </g>
      <path d="m380 535 66 23m-66-31 67 23" stroke="#c5b58b" strokeWidth="5" />
      <g fill="#f2ce78">
        <circle cx="192" cy="556" r="3" />
        <circle cx="120" cy="614" r="3" />
        <circle cx="325" cy="463" r="2" />
        <circle cx="539" cy="504" r="2" />
      </g>
      <path
        d="M0 680Q102 625 155 720H0ZM720 619Q604 609 585 720H720Z"
        fill="#0a2426"
      />
    </svg>
  );
}
