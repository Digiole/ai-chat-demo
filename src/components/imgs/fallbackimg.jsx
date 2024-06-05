const blinkingSvg = `
  <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
    <circle cx="75" cy="75" r="75" fill="#F5F6F6">
      <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite"/>
    </circle>
    <circle cx="75" cy="75" r="60" stroke="#c6c6c6" strokeWidth="3" fill="none" >
     <animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite"/>
       </circle>
  </svg>
`;

export const svgDataUrl = `data:image/svg+xml;base64,${btoa(blinkingSvg)}`;
