const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // CSS 파일 번들링 
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // CSS 파일 압축
const TerserPlugin = require("terser-webpack-plugin") // JAVASCRIPT 파일 압축
const CopyPlugin = require('copy-webpack-plugin'); // 정적폴더 복사 
module.exports = {
    // mode: "development",
    mode: "production", // production 설정시 자바스크립트는 자동으로 압축이 됨 
    entry : {
        index: "./main.js",
    },
    devtool: "source-map",
    devServer: { // 웹팩 개발서버 설정
        static: {
            directory: path.join(__dirname, 'public'), // 개발서버 시작시 public 폴더의 코드를 읽어서 서브함
            // publicPath: '/', // public URL 경로
          },
          port: 3000, // 개발서버 포트 설정
          compress: true, // 코드 압축여부 설정
    },
    output : { 
        path : path.resolve(__dirname, 'dist'), // 빌드후 코드가 저장될 폴더 설정 
        publicPath: '/yeso-expo/', // 서버의 상대 경로 // build 후 public  메인 URL 경로 (깃허브 저장소 주소) - 빌드시
        // publicPath: '/', // 서버의 상대 경로 // build 후 public  메인 URL 경로 (깃허브 저장소 주소) - 개발시
        filename : 'main.js', // 빌드후 자바스크립트 파일 이름 설정
        environment: {
            module: true,
            dynamicImport: true,   // 외부 CDN 라이브러리 임포트
        },
    },
    externalsType: "import",
    // externals: {
    //     home: "http://dreamplan7.cafe24.com/canvas/img/home.dae" // 외부 라이브러리 임포트
    // },
    // 빌드된 파일의 크기가 512000 이상이면 경고 메시지 출력
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    module: {
        rules: [
            {
                test : /\.js$/, // 자바스크립트 최신 문법을 구형 브라우저에서도 동작하게 설정
                exclude: /node_modules/, // 빌드시 node_modules 의 자바스크립트 파일은 배제하도록 설정
                use : "babel-loader"
            },
            {
                test : /\.css$/, // 스타일 코드를 하나로 합쳐주는 설정
                use : ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpg|jpe?g|gif|png|svg|ico|fbx)?$/, // 이미지 파일 설정
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]',
                },
            },    
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/, // 폰트 설정
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]', // 빌드시 파일 이름에 해쉬없이 원본이름 그대로 설정
                },
            },
            { test: /\.(xml|dae)$/, loader: 'xml-loader' } // will load all .xml files with xml-loader by default
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), // 사용하지 않는 빌드 파일 삭제 
        new HtmlWebpackPlugin({
          filename : 'index.html',
          template: './index.html', // html 파일 설정
          favicon: "./public/img/restroom_m.png" // 파비콘 경로 설정
        }),
        // new HtmlWebpackPlugin({
        //     filename : 'index_AI.html',
        //     template: './html/index_AI.html'
        // }),
        new MiniCssExtractPlugin({ // CSS 파일을 번들링해서 하나의 CSS 파일로 합쳐주도록 설정
            filename: "style.css" // 빌드 이후의 CSS 파일명
        }),
        new CopyPlugin({
            patterns: [{ from: 'public' }], // public 폴더를 dist 로 복사하는 개념 
        }),
    ],
    optimization: { 
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(), // CSS 파일 압축 설정
        //   new TerserPlugin({ // JAVASCRIPT 파일 압축 설정 
        //     terserOptions: {
        //       compress: {
        //         drop_console: true // 파일 압축시 console.log 는 성능상 제거하도록 설정
        //       }
        //     }
        //   }), 

          new TerserPlugin(), 

        ],
    },
}
