/*
 * @Description:cookie
 * @version:
 * @Author: Chengbotao
 * @Date: 2020-06-26 12:48:30
 * @LastEditors: Chengbotao
 * @LastEditTime: 2020-06-26 12:56:19
 */
const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
