import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'//mockjs
import path from 'path';

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'
// https://vitejs.dev/config/


export default ({ command, mode }) => {

 //参数mode为开放模式或生产模式
 const env=loadEnv(mode, process.cwd());   // 获取.env文件里定义的环境变量


  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],//按需加载组件官网
      }),
      Components({
        resolvers: [ElementPlusResolver()],//按需加载组件官网
      }),
      viteMockServe({
        mockPath: "./src/mock/", // 指向mock下的文件
        localEnabled: false // 是否开启开发环境
      })
    ],


    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),// 设置 `@` 指向 `src` 目录
        '~script': path.resolve(__dirname, './src/script'),
      }
    },
    //项目部署在主域名的子文件使用,例如http://localhost:3000/myvite/。不填默认就是/
    base: env.VITE_APP_BASE_URL || '/', // 设置打包路径
    server: {
      host: '127.0.0.1',
      port: 4000,// 设置服务启动端口号
      // port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),

      strictPort: true, // 端口被占用直接退出
      https: false,
      open: true,// 在开发服务器启动时自动在浏览器中打开应用程序 
      cors: true,// 允许跨域

      // 设置代理，根据我们项目实际情况配置
      proxy: {
        '/dev-api': {
          // target: 'http://xxx.xxx.xxx.xxx:8000',
          target: mode==='development'?env.VITE_APP_BASE_API:env.VITE_APP_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/dev-api/, '')
        }
      },
      hmr: {
        overlay: false // 屏蔽服务器报错
      }
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // additionalData: '@import "@/assets/scss/style.scss";'
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    }
  })
}










// export default defineConfig({
//   plugins: [
//     vue(),
//     AutoImport({
//       resolvers: [ElementPlusResolver()],//按需加载组件官网
//     }),
//     Components({
//       resolvers: [ElementPlusResolver()],//按需加载组件官网
//     }),
//     viteMockServe({
//       mockPath: "./src/mock/", // 指向mock下的文件
//       localEnabled: false // 是否开启开发环境
//     })
//   ],


//   resolve: {
//     alias: {
//       '@': resolve(__dirname, 'src'),// 设置 `@` 指向 `src` 目录
//       '~script': path.resolve(__dirname, './src/script'),
//     }
//   },
//   base: './', // 设置打包路径
//   server: {
//     host: '127.0.0.1',
//     port: 4000,// 设置服务启动端口号
//     strictPort: true, // 端口被占用直接退出
//     https: false,
//     open: true,// 在开发服务器启动时自动在浏览器中打开应用程序 
//     cors: true,// 允许跨域

//     // 设置代理，根据我们项目实际情况配置
//     proxy: {
//       '/dev-api': {
//         target: 'http://xxx.xxx.xxx.xxx:8000',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/dev-api/, '')
//       }
//     },
//     hmr: {
//       overlay: false // 屏蔽服务器报错
//     }
//   },
//   css: {
//     // css预处理器
//     preprocessorOptions: {
//       scss: {
//         additionalData: '@import "@/assets/styles/global.scss";'
//       }
//     }
//   },
//   build: {
//     chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('node_modules')) {
//             return id.toString().split('node_modules/')[1].split('/')[0].toString();
//           }
//         }
//       }
//     }
//   }
// })
