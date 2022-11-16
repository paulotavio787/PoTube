import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import React from "react";

function HomePage() {
    const estilosDaHomePage = {
        // backgroundColor: "red" 
    };
    const [valorDoFiltro, setValorDoFiltro] = React.useState("")



    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
            </div>
        </>
    );
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }


const StyledHeader = styled.div`
    background-color: ${({theme}) => theme.backgroundLevel1};
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-image: url(${config.bg});
    height: 230px;

`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...propriedades}) {
    const playlistNames = Object.keys(propriedades.playlists);
    var i = 0
    // Statement
    // Retorno por expressão
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                var videosStatus = false
                videos.filter((video) => {
                    const titleNormalized = video.title.toLowerCase()
                    const searchValueNormalized = searchValue.toLowerCase()
                    if (titleNormalized.includes(searchValueNormalized)) {
                        videosStatus = true
                        return
                    }
                })

                if (videosStatus === false) {
                    i++
                    if (i === 3) {
                        return (
                            <section key={propriedades}>
                                <h2 className="notF">This video was not found</h2>
                            </section>
                        )
                    }
                    return
                } else {
                    return (
                        <section key={playlistName}>
                            <h2>{playlistName}</h2>
                            <div>
                                {videos.filter((video) => {
                                    const titleNormalized = video.title.toLowerCase()
                                    const searchValueNormalized = searchValue.toLowerCase()
                                    return titleNormalized.includes(searchValueNormalized)
                                }).map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                            </div>
                        </section>
                    )
                }

            })}
        </StyledTimeline>
    )
}