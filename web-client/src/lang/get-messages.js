const getMessages = async (locale) => {
  try {
    return require(`../lang/locale/${locale}.json`);
  } catch (error) {
    console.error(error)
    return require(`../lang/locale/en.json`);
  }
}

export default getMessages
