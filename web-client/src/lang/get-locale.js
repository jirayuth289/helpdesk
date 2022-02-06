//import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

const acceptLanguages = ['en', 'th']
const defaultLocale = acceptLanguages[0]

const getLocale = async (ctx) => {
  try {
    const cookieLocale = cookie.get("locale");
    // console.log("cookieLocale", cookieLocale);
    //nextCookie(ctx).locale
    let locale = defaultLocale
    if (cookieLocale) {
      // check if user has set locale
      locale = acceptLanguages.includes(cookieLocale) ? cookieLocale : defaultLocale
    } else {
      // check if user has set locale
      // const systemLocale = ctx.req.headers['accept-language'] || navigator.language || defaultLocale
      // locale = acceptLanguages.includes(systemLocale) ? systemLocale : defaultLocale
      locale = acceptLanguages.includes(cookieLocale)
        ? cookieLocale
        : defaultLocale;
      cookie.set('locale', locale, { expires: 365 })
    }
    return locale
  } catch (error) {
    return defaultLocale
  }
}

export default getLocale
