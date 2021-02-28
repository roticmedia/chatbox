const unique_token = async () => {
    let response = await fetch("https://api.ipify.org");
    return response + "**" + new Date().getTime() ;
}

module.exports = unique_token;