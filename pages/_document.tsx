import Document, {Head, Html, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang='en'>
                <Head/>
                <body>
                    <div id='overlays'/>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument
