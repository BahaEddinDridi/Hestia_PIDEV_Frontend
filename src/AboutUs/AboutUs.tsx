import React, { useRef, useState } from 'react';

import DefaultLayout from '../layout/DefaultLayout';
import Mohsen from '../images/team/Mohsen.jpg';
import Baha from '../images/team/BahaEddine.jpg';
import Sarra from '../images/team/Sarrah.jpg';
import Farah from '../images/team/Farah.jpg';
import Omayma from '../images/team/Oumaima.jpg';
import HomePageLayout from '../layout/HomePageLayout';
import HomeNavbar from '../components/Header/HomeNavBar';

import { WavyBackground } from './wavy-background';
const AboutUs: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const signUpRef = useRef<HTMLDivElement>(null);
  return (
    <HomePageLayout>
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <p className="text-2xl md:text-4xl lg:text-7xl text-red-700 font-bold inter-var text-center">
          About Us
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
          Fondée en 2003 à l’initiative de trois universitaires ayant conduit de
          nombreux projets dans l’enseignement supérieur tunisien, et dans
          l’enseignement supérieur technique en particulier, entourés de
          plusieurs dizaines de leurs collègues, ainsi que d’entreprises TIC et
          de partenaires financiers, Esprit a dès le départ mis en place des
          formations basées sur des valeurs intangibles
        </p>
      </WavyBackground>

      <div className="">
        <section className="mx-auto containerr gap-5 grid m-5 mb-20 md:mt-8 mt-10 px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-semibold text-[#ff0000] mb-3 text-3xl underline">
                Se former autrement
              </h2>
              <p className="font-inter">
                vise à former des ingénieurs directement opérationnels : cela
                passe par une approche pédagogique innovante, l’APP
                apprentissage par projets/problèmes, notamment au travers de la
                participation à de nombreuxchallenge nationaux et
                internationaux.
              </p>
              <p className="font-inter">
                Les activités de recherche et développement dans lesquels les
                étudiants peuvent être acteurs y jouent aussi leur rôle.
                Récemment créé , Esprit incubator constitue un puissant outil
                contribuant à permettre aux étudiants porteurs d’idées
                innovantes à aller, dans le cadre de leur formation, jusqu’à la
                création de leur start up s’ils le souhaitent.
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-[#ff0000] mb-3 text-3xl underline">
                La notion de responsabilité et d’inclusion sociales
              </h2>
              <p className="font-inter">
                Esprit se veut depuis sa création une école ouverte au plus
                grand nombre. Dès le début, des mécanismes ont été déployés pour
                qu’un jeune ayant du talent puisse, quelle que soit sa situation
                sociale, suivre les cours et obtenir son diplôme. Depuis deux
                ans, l’école a souhaité amplifier le phénomène par la création
                de la Fondation Esprit en vue d’aider les jeunes à financer leur
                formation.
              </p>
            </div>
          </div>
          <div className="place-self-center ">
            <h2 className="underline text-[#ff0000] text-3xl font-bold md:my-8 md:text-center my-10 text-center">
              Les plus d'ESPRIT
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="text-center">
                <div className="mt-2 sm:mt-4">
                  <h3 className="font-medium text-2xl text-red-800 ">
                    Les qualités d'ingénieur et de manager
                  </h3>
                  <p className="text-gray-400 text-lg">
                    La touche Esprit pour les formations d’ingénieurs :
                  </p>
                  <p className="px-10 md:text-base">
                    Créativité et compétences opérationnelles, Qualités humaines
                    : esprit d’équipe, communication, leadership, créativité,
                    rigueur, Répondre aux besoins de l’entreprise dans des
                    filières d’avenir, Reconnaissance internationale à travers
                    l’accréditation EUR- ACE (délivrée par la CTI) Et par
                    l’adhésion à la conférence des grandes école (CGE) et
                    l’initiative CDIO.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="mt-2 sm:mt-4">
                  <h3 className="font-medium text-2xl text-red-800 ">
                    La formation
                  </h3>
                  <p className="text-gray-400 text-lg">
                    Des synergies fortes entre les différentes formations
                    (ingénieur, management, classes préparatoires) :
                  </p>
                  <p className="px-10 md:text-base">
                    Une équipe pédagogique de 250 enseignants permanents
                    qualifiés (1 pour 18 étudiants), L’accompagnement
                    personnalisé des étudiants, en particulier les étudiants
                    étrangers qui bénéficient d’un service spécial pour suivre
                    leur dossier, L’enseignement en petits groupes de 30, La
                    forte culture numérique qui imprègne toutes les formations.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="mt-2 sm:mt-4">
                  <h3 className="font-medium text-2xl text-red-800 ">
                    La vie étudiante
                  </h3>
                  <p className="text-gray-400 text-lg">
                    Une vie étudiante riche et variée qui complète pleinement la
                    formation académique :
                  </p>
                  <p className="px-10 md:text-base">
                    Plus de 40 clubs dans des domaines très divers (Junior
                    entreprise, Enactus, club santé, club théâtre, club google
                    ou Mozilla ...), Possibilité de participer à des
                    compétitions sportive de haut niveau : les étudiants
                    d’Esprit se retrouvent régulièrement en finale des
                    championnats universitaires en différents sports,
                    Participation à des challenges nationaux ou internationaux.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="mt-2 sm:mt-4">
                  <h3 className="font-medium text-2xl text-red-800 ">
                    Des classes préparatoires aux grandes écoles très
                    performantes
                  </h3>
                  <p className="text-gray-400 text-lg">
                    89% des élèves d’Esprit Prépa intègrent une grande école
                    française ou tunisienne en 2015 :
                  </p>
                  <p className="px-10 md:text-base">
                    1 au concours des écoles normales supérieures 1 à l’école
                    polytechnique (X) 4 au concours commun Mines Pont, 3 au
                    concours commun Centrale Supelec 25 au concours commun
                    polytechnique, 24 au concours INT- Telecom 38 au concours
                    national.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <HomeNavbar
        signUpRef={signUpRef}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </HomePageLayout>
  );
};

export default AboutUs;
