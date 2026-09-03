import { serializeUseCacheCacheStore } from "next/dist/server/resume-data-cache/cache-store";

type IconlyIconProps = {
      size?: number;
      color?: string;
}

export const IconlyLogo = ({ size = 24, color = "#000000" }: IconlyIconProps) => {
      return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48">
                  <path d="M0 0h48v48H0z" fill="none" />
                  <path fill={color} stroke={color} strokeWidth="4" d="M15 20.612c-1.424 6.15 6.493 7.715 4.624 12.048c-1.87 4.332-6.055 3.466-5.588 7.798c.468 4.333 6.006 4.394 11.048 1.784c10.083-5.221 12.187-16.625 7.624-21.63c-5.608-6.15-16.284-6.15-17.708 0Z" />
                  <ellipse cx="34.535" cy="13.535" fill={color} rx="2" ry="3" transform="rotate(40 34.535 13.535)" />
                  <ellipse cx="29.381" cy="10.603" fill={color} rx="2" ry="3" transform="rotate(25 29.38 10.603)" />
                  <ellipse cx="23.381" cy="9.603" fill={color} rx="2" ry="3" transform="rotate(6 23.38 9.603)" />
                  <ellipse cx="14" cy="8" fill={color} stroke={color} strokeWidth="4" rx="3" ry="4" transform="rotate(-20 14 8)" />
                  <ellipse cx="38.535" cy="17.536" fill={color} rx="2" ry="3" transform="rotate(50 38.535 17.536)" />
            </svg>

      )
}

export const IconlyFacebook = ({ size = 24, color = "#000000" }: IconlyIconProps) => {
      return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 640 640">
                  <path d="M0 0h640v640H0z" fill="none" />
                  <path fill={color} d="M240 363.3V576h116V363.3h86.5l18-97.8H356v-34.6c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4.4 37 1.2V71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4v42.1h-66v97.8z" />
            </svg>


      )
}

export const IconlyGoogle = ({ size = 24, color = "#000000" }: IconlyIconProps) => {
      return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 1024 1024">
                  <path d="M0 0h1024v1024H0z" fill="none" />
                  <path fill={color} d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8c-34.4 23-78.3 36.6-129.9 36.6c-99.9 0-184.4-67.5-214.6-158.2c-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1c56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100c-149.9 0-279.6 86-342.7 211.4c-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93c72.5-66.8 114.4-165.2 114.4-282.1c0-27.2-2.4-53.3-6.9-78.5" />
            </svg>

      )
}

export const IconlyLoader = ({ size = 24, color = "#000000" }: IconlyIconProps) => {
      return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path fill={color} d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z">
                        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                  </path>
            </svg>
      )
}

export const IconlyShow = ({ size = 24, color = "#000000" }: IconlyIconProps) => {
      return (
            <svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.0022 10.0361C10.6703 10.0361 9.59021 11.1155 9.59021 12.4481C9.59021 13.7799 10.6704 14.8601 12.0022 14.8601C13.334 14.8601 14.4142 13.7799 14.4142 12.4481C14.4142 11.1155 13.3342 10.0361 12.0022 10.0361ZM8.09021 12.4481C8.09021 10.2867 9.84215 8.5361 12.0022 8.5361C14.1623 8.5361 15.9142 10.2867 15.9142 12.4481C15.9142 14.6083 14.1624 16.3601 12.0022 16.3601C9.842 16.3601 8.09021 14.6083 8.09021 12.4481Z" fill={color}></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.97577 6.99435C6.77017 5.47727 9.25098 4.39609 12.0022 4.39609C14.7529 4.39609 17.2337 5.47642 19.0282 6.99314C20.8033 8.49335 22.0042 10.5101 22.0042 12.4481C22.0042 14.3861 20.8033 16.4028 19.0282 17.903C17.2337 19.4198 14.7529 20.5001 12.0022 20.5001C9.25098 20.5001 6.77017 19.4189 4.97577 17.9018C3.20099 16.4013 2.00024 14.3846 2.00024 12.4481C2.00024 10.5116 3.20099 8.49485 4.97577 6.99435ZM5.94422 8.13983C4.3705 9.47033 3.50024 11.1046 3.50024 12.4481C3.50024 13.7916 4.3705 15.4258 5.94422 16.7564C7.49832 18.0703 9.64351 19.0001 12.0022 19.0001C14.3606 19.0001 16.5058 18.0709 18.06 16.7574C19.6337 15.4273 20.5042 13.7931 20.5042 12.4481C20.5042 11.1031 19.6337 9.46883 18.06 8.13878C16.5058 6.82525 14.3606 5.89609 12.0022 5.89609C9.64351 5.89609 7.49832 6.82591 5.94422 8.13983Z" fill={color}></path>
            </svg>
      )
}

export const IconlyHide = ({ size = 24, color = "#000000" }: IconlyIconProps) => {
      return (
            <svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.58279 20.8134C3.72879 20.9604 3.92079 21.0334 4.11279 21.0334C4.30479 21.0334 4.49679 20.9604 4.64279 20.8134L6.8693 18.5868C6.92208 18.5468 6.97024 18.4991 7.01201 18.4441L20.4168 5.03936C20.7098 4.74636 20.7098 4.27136 20.4168 3.97836C20.1238 3.68536 19.6498 3.68536 19.3568 3.97836L17.4787 5.85659C15.8036 4.8682 13.9202 4.34845 11.9958 4.34845C6.45585 4.34845 1.99585 8.75245 1.99585 12.3984C1.99585 14.3482 3.25178 16.5047 5.25638 18.0797L3.58279 19.7534C3.28979 20.0464 3.28979 20.5204 3.58279 20.8134ZM6.32619 17.0098C4.61299 15.7148 3.49585 13.918 3.49585 12.3984C3.49585 9.45045 7.41785 5.84845 11.9958 5.84845C13.5225 5.84845 15.0206 6.22983 16.3776 6.95776L14.1842 9.15125C13.5423 8.71895 12.7766 8.48004 11.9977 8.48004H11.9887C10.9437 8.48204 9.96272 8.89104 9.22472 9.63104C8.48772 10.371 8.08272 11.354 8.08572 12.394C8.0827 13.1742 8.32084 13.9406 8.75435 14.5815L6.32619 17.0098ZM9.84732 13.4884L13.0907 10.2448C12.754 10.0729 12.3779 9.98004 11.9967 9.98004H11.9917C11.3467 9.98104 10.7417 10.233 10.2877 10.689C9.83372 11.146 9.58372 11.751 9.58572 12.395C9.58392 12.7775 9.67612 13.153 9.84732 13.4884Z" fill={color}></path>
                  <path d="M11.9942 20.4492C11.0472 20.4492 10.0962 20.3192 9.16418 20.0612C8.76518 19.9512 8.53118 19.5382 8.64118 19.1392C8.75118 18.7392 9.16718 18.5062 9.56418 18.6162C10.3652 18.8372 11.1822 18.9492 11.9942 18.9492C16.5772 18.9492 20.5042 15.3472 20.5042 12.3982C20.5042 11.4432 20.0602 10.3542 19.2552 9.33423C18.9992 9.00923 19.0552 8.53723 19.3802 8.28023C19.7052 8.02423 20.1772 8.07923 20.4332 8.40423C21.4462 9.68923 22.0042 11.1072 22.0042 12.3982C22.0042 16.0452 17.5392 20.4492 11.9942 20.4492Z" fill={color}></path>
                  <path d="M12.5662 16.25C12.2112 16.25 11.8962 15.997 11.8292 15.636C11.7542 15.229 12.0242 14.837 12.4322 14.763C13.4112 14.582 14.1892 13.804 14.3662 12.824C14.4402 12.416 14.8292 12.148 15.2382 12.22C15.6452 12.294 15.9162 12.684 15.8422 13.092C15.5542 14.682 14.2932 15.945 12.7022 16.237C12.6572 16.246 12.6112 16.25 12.5662 16.25Z" fill={color}></path>
            </svg>
      )
}

export const IconlyRefresh = ({ size = 24, color = "#000000" }: IconlyIconProps) => {
      return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48">
                  <path d="M0 0h48v48H0z" fill="none" />
                  <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M42 8v16M6 24v16m36-16c0-9.941-8.059-18-18-18a17.95 17.95 0 0 0-12.952 5.5M6 24c0 9.941 8.059 18 18 18a17.94 17.94 0 0 0 12.5-5.048" />
            </svg>

      )
}

export const FiCheckCircle = ({ size = 24, color = "#000000" }: IconlyIconProps) => {
      return (
            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12l6 6L20 6" />
            </svg>
      )
}
export const FiXCircle = ({ size = 24, color = "#000000" }: IconlyIconProps) => {
      return (
<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="none" stroke={color} strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20" />
</svg>

      )
}