import Grid from "../src/components/Grid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { useState } from "react";

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
  const [comunidades, setComunidades] = useState([
    {
      id: new Date().toISOString(),
      title: "Eu odeio acordar cedo",
      imageUrl: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
    },
  ]);

  const githubUser = "fontanela";
  const pessoasFavoritas = [
    "fontanela",
    "peas",
    "omariosouto",
    "juunegreiros",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const dadosDoform = new FormData(e.target);

    const comunidade = {
      id: new Date().toISOString(),
      title: dadosDoform.get("title"),
      imageUrl: dadosDoform.get("image"),
    };

    setComunidades([...comunidades, comunidade]);

    console.log(comunidades);
  };

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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
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
