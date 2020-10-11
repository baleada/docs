<template>
  <svg
    role="img"
    viewBox="0 0 1000 1000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <g :clip-path="`url(#${id}-baleada-logo-clip)`">
      <g :filter="hasShadow ? `url(#${id}-baleada-logo-shadow)` : ''">
        <mask
          :id="`${id}-baleada-logo-mask`"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="49"
          y="81"
          width="901"
          height="866"
        >
          <path
            d="M219.155 212.558C9.3317 401.484 -7.60915 724.735 181.317 934.559C280.14 1044.31 1039.98 360.151 941.156 250.397C752.23 40.5732 428.979 23.6324 219.155 212.558Z"
            fill="#000"
          />
        </mask>
        <g :mask="`url(#${id}-baleada-logo-mask)`">
          <!-- Filled tortilla -->
          <path
            v-if="type === 'fill'"
            :class="tortillaClasses"
            d="M219.155 212.558C9.3317 401.484 -7.60915 724.735 181.317 934.559C280.14 1044.31 1039.98 360.151 941.156 250.397C752.23 40.5732 428.979 23.6324 219.155 212.558Z"
            fill="currentColor"
          />

          <!-- Burn marks -->
          <path
            :class="(type === 'fill') ? burnClasses : classes"
            d="M267.546 609.263C289.797 633.976 287.802 672.047 263.089 694.299C238.376 716.55 200.305 714.555 178.053 689.842C155.802 665.13 157.797 627.058 182.51 604.807C207.223 582.555 245.294 584.551 267.546 609.263Z"
            fill="currentColor"
          />
          <path
            :class="(type === 'fill') ? burnClasses : classes"
            d="M592.074 664.079C619.363 694.387 616.916 741.079 586.609 768.368C556.301 795.657 509.609 793.21 482.32 762.902C455.03 732.594 457.477 685.903 487.785 658.613C518.093 631.324 564.785 633.771 592.074 664.079Z"
            fill="currentColor"
          />
          <path
            :class="(type === 'fill') ? burnClasses : classes"
            d="M328.951 297.146C340.286 309.736 339.27 329.131 326.68 340.466C314.091 351.802 294.696 350.785 283.36 338.196C272.025 325.607 273.041 306.212 285.631 294.876C298.22 283.54 317.615 284.557 328.951 297.146Z"
            fill="currentColor"
          />
          <path
            :class="(type === 'fill') ? burnClasses : classes"
            d="M720.688 312.85C751.336 346.888 748.587 399.326 714.549 429.974C680.511 460.622 628.073 457.874 597.425 423.836C566.777 389.798 569.525 337.36 603.563 306.712C637.601 276.064 690.04 278.812 720.688 312.85Z"
            fill="currentColor"
          />
          <path
            :class="(type === 'fill') ? burnClasses : classes"
            d="M546.845 53.5626C577.493 87.6007 574.745 140.039 540.707 170.687C506.669 201.335 454.23 198.587 423.582 164.549C392.934 130.511 395.683 78.0724 429.721 47.4244C463.759 16.7764 516.197 19.5246 546.845 53.5626Z"
            fill="currentColor"
          />

          <!-- Outlined tortilla -->
          <path
            v-if="type === 'outline'"
            :class="classes"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M210.584 904.282C212.974 904.646 219.926 904.973 235.06 900.732C259.724 893.821 293.345 877.916 333.936 853.432C414.447 804.867 513.416 728.07 607.25 643.582C701.085 559.093 787.806 468.693 844.52 393.7C873.114 355.891 892.445 324.116 901.897 300.31C907.696 285.702 908.098 278.754 907.985 276.339C734.312 85.8006 439.121 71.0166 247.259 243.771C55.3962 416.524 39.2433 711.643 210.584 904.282ZM181.317 934.559C-7.60916 724.735 9.33169 401.484 219.155 212.558C428.979 23.6324 752.229 40.5732 941.156 250.397C1039.98 360.151 280.14 1044.31 181.317 934.559Z"
            fill="currentColor"
          />
        </g>
      </g>
    </g>
    <defs>
      <filter
        :id="`${id}-baleada-logo-shadow`"
        x="10"
        y="61.2415"
        width="980"
        height="945.195"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood
          flood-opacity="0"
          result="BackgroundImageFix"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="20" />
        <feGaussianBlur stdDeviation="20" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <clipPath :id="`${id}-baleada-logo-clip`">
        <rect
          width="1000"
          height="1000"
          fill="white"
        />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
export default {
  name: 'BrandLogo',
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'fill',
      validator: (value) => ['fill', 'outline'].indexOf(value) !== -1
    },
    hasShadow: {
      type: Boolean,
      default: false
    },
    tortillaClasses: {
      type: [String, Array],
      default: 'text-primary-10',
    },
    burnClasses: {
      type: [String, Array],
      default: 'text-primary-80',
    },
    classes: {
      type: [String, Array],
      default: 'text-primary-60',
    }
  }
}
</script>
