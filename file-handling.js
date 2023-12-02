
function downloadContent() {
    const blob = new Blob([content], { type: "text/plain" });
    console.log(blob);
    const url = URL.createObjectURL(blob);
    console.log(url);

    const link = document.createElement("a");
    link.href = url;
    link.download = "temp.txt";
    link.click(); 
}