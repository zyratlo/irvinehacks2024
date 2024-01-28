import './footer.css'
function FooterText() {
    const styling = {
        display: "inlineBlock",
        justifyContent : "space-between",
        alignItems: "center",
    }

    return (
        <>
            <div style={styling}>
                <p>IrvineHacks 2024{'\u2122'}</p>
                <p>Team Yash</p>
            </div>
        </> )
}

// function TeamName() {
//     return <p>Team Yash</p>
// }

export default FooterText;
// export default TeamName;