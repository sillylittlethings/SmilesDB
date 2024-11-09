onload = () => {
    console.log([...document.getElementsByTagName("a")].filter(x => x.href.startsWith("https://www.bindingdb.org/rwd/bind/searchby_target.jsp?")).join("\n"))
}