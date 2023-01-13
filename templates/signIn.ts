export function signInString({ url }: { url: string }) {
  return `Confirm Sign In by link: ${url}`;
}

export function signInTemplate({ url }: { url: string }) {
  return `
    <mjml>
      <mj-head>
        <mj-title>Sign In</mj-title>
      </mj-head>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-divider border-color="#d54343"></mj-divider>

            <mj-text font-size="32px" color="#d54343" font-family="helvetica">
              Welcome to Swordfish
            </mj-text>
            
            <mj-text font-size="18px" color="#d54343" font-family="helvetica">
              Confirm Sign In, please
            </mj-text>
            
            <mj-button background-color="#d54343" align="left" href="${url}">
              Sign In
            </mj-button>
            
            <mj-text font-size="12px" color="#d54343" font-family="helvetica">
              or use this link <a href="${url}">${url}</a>
            </mj-text>

          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `;
}
