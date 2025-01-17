import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }
    render() {
        return (
            <Html lang="en">
                <Head />
                <body className="body">
                    <StyleSheetManager disableCSSOMInjection={false}>
                        <Main />
                    </StyleSheetManager>
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
