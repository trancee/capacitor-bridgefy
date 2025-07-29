import { Bridgefy, TransmissionType } from '@capacitor-trancee/bridgefy'

const scrollToBottom = t => t.scrollTop = t.scrollHeight

const statusEl = document.querySelector("#status")
statusEl.addEventListener("change", () => {
    scrollToBottom(this)
})
const logStatus = (status) => {
    statusEl.value += `${status}` + "\n"
    scrollToBottom(statusEl)
}

const eventsEl = document.querySelector("#events")
eventsEl.addEventListener("change", () => {
    scrollToBottom(this)
})
const logEvent = (event) => {
    eventsEl.value += `⚡ ${event}` + "\n"
    scrollToBottom(eventsEl)
}

window.testInitialize = async () => {
    const options = {}

    if (document.getElementById("apiKey") && document.getElementById("apiKey").value.length > 0) {
        options.apiKey = document.getElementById("apiKey").value
    }
    if (document.getElementById("verboseLogging")) {
        options.verboseLogging = document.getElementById("verboseLogging").checked
    }

    const result = await window.execute("initialize", options)
}

window.testIsInitialized = async () => {
    const options = {}

    const result = await window.execute("isInitialized", options)
}

window.testStart = async () => {
    const options = {}

    if (document.getElementById("userID") && document.getElementById("userID").value.length > 0) {
        options.userID = document.getElementById("userID").value
    }
    if (document.getElementById("propagationProfile") && document.getElementById("propagationProfile").value.length > 0) {
        options.propagationProfile = document.getElementById("propagationProfile").value
    }

    const result = await window.execute("start", options)
}

window.testIsStarted = async () => {
    const options = {}

    const result = await window.execute("isStarted", options)
}

window.testStop = async () => {
    const options = {}

    document.querySelector("#peers").options.length = 0

    statusEl.value = ""
    eventsEl.value = ""

    const result = await window.execute("stop", options)
}

window.testConnectedPeers = async () => {
    const options = {}

    const result = await window.execute("connectedPeers", options)
}

window.testLicenseExpirationDate = async () => {
    const options = {}

    const result = await window.execute("licenseExpirationDate", options)
}

window.testUpdateLicense = async () => {
    const options = {}

    const result = await window.execute("updateLicense", options)
}

window.testDestroySession = async () => {
    const options = {}

    const result = await window.execute("destroySession", options)
}

window.testCurrentUserID = async () => {
    const options = {}

    const result = await window.execute("currentUserID", options)
}

window.testEstablishSecureConnection = async () => {
    const options = {}

    if (document.getElementById("peers") && document.getElementById("peers").value.length > 0) {
        options.userID = document.getElementById("peers").value
    }

    const result = await window.execute("establishSecureConnection", options)
}
window.testFingerprint = async () => {
    const options = {}

    if (document.getElementById("peers") && document.getElementById("peers").value.length > 0) {
        options.userID = document.getElementById("peers").value
    }

    const result = await window.execute("fingerprint", options)
}
window.testIsFingerprintValid = async () => {
    const options = {}

    if (document.getElementById("peers") && document.getElementById("peers").value.length > 0) {
        options.userID = document.getElementById("peers").value
    }
    if (document.getElementById("fingerprint") && document.getElementById("fingerprint").value.length > 0) {
        options.fingerprint = document.getElementById("fingerprint").value
    }

    const result = await window.execute("isFingerprintValid", options)
}

window.testSend = async () => {
    const options = {}

    if (document.getElementById("data") && document.getElementById("data").value.length > 0) {
        options.data = document.getElementById("data").value
    }
    if (document.getElementById("transmissionMode") && document.getElementById("transmissionMode").value.length > 0) {
        options.transmissionMode = {}

        options.transmissionMode.type = document.getElementById("transmissionMode").value

        if (document.getElementById("transmissionMode").value === TransmissionType.BROADCAST) {
            options.transmissionMode.uuid = document.getElementById("userID").value
        } else if (document.getElementById("peers") && document.getElementById("peers").value.length > 0) {
            options.transmissionMode.uuid = document.getElementById("peers").value
        }
    }

    const result = await window.execute("send", options)
}

window.testCheckPermissions = async () => {
    const options = {}

    const result = await window.execute("checkPermissions", options)
}

window.testRequestPermissions = async () => {
    const options = {}
    const permissions = []

    if (document.getElementById("bluetooth").checked)
        permissions.push('bluetooth')

    if (document.getElementById("location").checked)
        permissions.push('location')

    if (permissions.length > 0) {
        options.permissions = permissions
    }

    const result = await window.execute("requestPermissions", options)
}

window.execute = async (method, options) => {
    try {
        options = Object.keys(options).length > 0 ? options : undefined

        logStatus(`⚪ ${method}(${JSON.stringify(options) || ""})`)

        const result = await Bridgefy[method](options)

        logStatus(`⚫ ${method}(${JSON.stringify(result) || ""})`)

        return result
    } catch (error) {
        logStatus(`⛔ ${error}`)
    }
}

Bridgefy.addListener('onStarted',
    (event) => {
        logEvent(`onStarted(${JSON.stringify(event) || ""})`)

        const userID = event.userID

        document.getElementById("userID").value = userID
    })
Bridgefy.addListener('onFailToStart',
    (event) => {
        logEvent(`onFailToStart(${JSON.stringify(event) || ""})`)

        const exception = event.exception
    })
Bridgefy.addListener('onStopped',
    () => {
        logEvent(`onStopped()`)
    })
Bridgefy.addListener('onFailToStop',
    (event) => {
        logEvent(`onFailToStop(${JSON.stringify(event) || ""})`)

        const exception = event.exception
    })
Bridgefy.addListener('onDestroySession',
    () => {
        logEvent(`onDestroySession()`)
    })
Bridgefy.addListener('onFailToDestroySession',
    (event) => {
        logEvent(`onFailToDestroySession(${JSON.stringify(event) || ""})`)

        const exception = event.exception

        alert(exception)
    })

Bridgefy.addListener('onConnected',
    (event) => {
        logEvent(`onConnected(${JSON.stringify(event) || ""})`)

        const peerID = event.peerID

        addOption(peerID, peerID)
    })
Bridgefy.addListener('onDisconnected',
    (event) => {
        logEvent(`onDisconnected(${JSON.stringify(event) || ""})`)

        const peerID = event.peerID

        removeOption(peerID)
    })
Bridgefy.addListener('onConnectedPeers',
    (event) => {
        logEvent(`onConnectedPeers(${JSON.stringify(event) || ""})`)

        const connectedPeers = event.peerIDs

        connectedPeers.forEach(peerID => {
            addOption(peerID, peerID)
        })
    })

Bridgefy.addListener('onEstablishSecureConnection',
    (event) => {
        logEvent(`onEstablishSecureConnection(${JSON.stringify(event) || ""})`)

        const userID = event.userID
    })
Bridgefy.addListener('onFailToEstablishSecureConnection',
    (event) => {
        logEvent(`onFailToEstablishSecureConnection(${JSON.stringify(event) || ""})`)

        const userID = event.userID
        const exception = event.exception

        alert(exception)
    })

Bridgefy.addListener('onSend',
    (event) => {
        logEvent(`onSend(${JSON.stringify(event) || ""})`)

        const messageID = event.messageID
    })
Bridgefy.addListener('onFailToSend',
    (event) => {
        logEvent(`onFailToSend(${JSON.stringify(event) || ""})`)

        const messageID = event.messageID
        const exception = event.exception

        alert(exception)
    })
Bridgefy.addListener('onProgressOfSend',
    (event) => {
        logEvent(`onProgressOfSend(${JSON.stringify(event) || ""})`)

        const messageID = event.messageID
        const position = event.position
        const total = event.total
    })
Bridgefy.addListener('onReceiveData',
    (event) => {
        logEvent(`onReceiveData(${JSON.stringify(event) || ""})`)

        const messageID = event.messageID
        const data = event.data
        const transmissionMode = event.transmissionMode
    })

window.toggle = async (element) => {
    const legend = element.previousElementSibling
    const sibling = element.nextElementSibling

    const title = legend.title

    if (sibling.style.display === "none") {
        sibling.style.display = ""

        legend.title = legend.innerText
        legend.innerText = title

        element.innerText = "▲"
    } else {
        sibling.style.display = "none"

        legend.title = legend.innerText
        legend.innerText = title

        element.innerText = "▼"
    }
}

function addOption(value, text) {
    const select = document.querySelector("#peers")

    // Check if the value already exists
    const exists = Array.from(select.options).some(option => option.value === value)

    if (!exists) {
        const option = document.createElement("option")

        option.value = value
        option.text = text

        select.add(option)
    }
}
function removeOption(value) {
    const option = document.querySelector(`#peers option[value="${CSS.escape(value)}"]`)

    if (option) {
        option.remove()
    }
}
