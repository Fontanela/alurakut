import Grid from "../src/components/Grid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { useEffect, useState } from "react";

function ProfileSideBar({ githubUser }) {
  return (
    <Box as="aside">
      <img
        style={{ borderRadius: "8px" }}
        src={`https://github.com/${githubUser}.png`}
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}.png`}>
          @{githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const [comunidades, setComunidades] = useState([]);
  const [seguidores, setSeguidores] = useState([]);
  const githubUser = "fontanela";

  const handleSubmit = (e) => {
    e.preventDefault();
    const dadosDoform = new FormData(e.target);

    const comunidade = {
      id: new Date().toISOString(),
      title: dadosDoform.get("title"),
      imageUrl: dadosDoform.get("image"),
    };

    setComunidades([...comunidades, comunidade]);
  };

  useEffect(() => {
    fetch("https://api.github.com/users/fontanela/followers")
      .then((res) => res.json())
      .then((resJson) => {
        setSeguidores(resJson);
        console.log(seguidores[0]);
      });
  }, []);

  function ProfileRelationsBox({ title, items }) {
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {title} ({items.length})
        </h2>
        <ul>
          {items.map((i) => {
            return (
              <li key={i.id}>
                <a href={`/users/${i.login}`} key={i.id}>
                  <img src={i.avatar_url} />
                  <span>{i.login}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </ProfileRelationsBoxWrapper>
    );
  }

  return (
    <>
      <AlurakutMenu />
      <Grid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual}`} key={itemAtual.id}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </Grid>
    </>
  );
}
