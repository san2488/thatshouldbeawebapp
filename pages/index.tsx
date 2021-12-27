import fs from 'fs'
import type { InferGetStaticPropsType, NextPage } from 'next'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import path from 'path'
import styles from '../styles/Home.module.css'

enum Responsiveness {
  NA = 0,
  MobileWebsite,
  A2HS,
  WebApk,

  __LENGTH
}

enum Category {
  Social,
  Food
}

type App = {
  domain: string,
  url?: URL,
  responsiveness: Responsiveness,
  whatworks: string
  whatdoesntwork: string,
  keywords: Category[]
}

export const getStaticProps: GetStaticProps = async (context) => {
  const dataFilePath = path.join('./data', 'data.json')
  const data: App[] = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'))
  return {
    props: { data }
  }
}

const Home: NextPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>That should be a Web App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          That should be a Web App
        </h1>

        <div className="accordion" id="accordionExample">
          {data.map( (app: App, index: number) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={"heading" + index}>
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} aria-expanded="true" aria-controls={"collapse" + index}>
                  {app.domain}
                </button>
              </h2>
              <div id={"collapse" + index} className="accordion-collapse collapse show" aria-labelledby={"heading" + index} data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {app.responsiveness}
                  <div className="progress">
                    <div className={"progress-bar"  + " w-" + (Number(Responsiveness[app.responsiveness]) / Responsiveness.__LENGTH * 100)} role="progressbar" aria-valuenow={ Number(Responsiveness[app.responsiveness]) } aria-valuemin={0} aria-valuemax={Responsiveness.__LENGTH}></div>
                  </div>
                  { app.whatworks != "" &&
                  <div>
                    <h3>What works</h3>
                    <p>
                      {app.whatworks}
                    </p>
                  </div>
                  }
                  { app.whatdoesntwork != "" &&
                  <div>
                    <h3>What doesn&apos;t work</h3>
                    <p>
                      {app.whatdoesntwork}
                    </p>
                  </div>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </main>

      <footer className={styles.footer}>
        <div id="copyright">&copy; Copyright {(new Date()).getFullYear()} Sujay Narsale | All Rights Reserved </div>
      </footer>
    </div>
  )
}

export default Home
