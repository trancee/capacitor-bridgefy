import { Bridgefy } from '@capacitor-trancee/bridgefy';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    Bridgefy.echo({ value: inputValue })
}
