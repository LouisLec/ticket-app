import { sdk } from "@/utils/sdk/sdk";
import { Fragment } from "react";
import { ProjectDiagram } from "./Tree";
import { cookies } from "next/headers";

const Devis = async ({ params: { organizationSlug, projectSlug } }) => {
  const nextCookies = cookies();
  const token = nextCookies.get("jwt");
  const data = await sdk({
    headers:
      token?.value !== undefined
        ? {
            Authorization: `Bearer ${token?.value}`,
          }
        : {},
  }).GetProjectBySlug({
    projectSlug,
    organizationSlug,
  });
  return (
    <div className="print:bg-[url('/draft2.png')] min-h-screen pt-12 mx-20 bg-white border  bg-opacity-10 dark:bg-black rounded-t-3xl dark:border-slate-800 border-slate-200 print:m-0 print:p-0 print:bg-white print:rounded-none print:border-none">
      <div className="px-8 py-6 mx-auto mb-12 font-mono leading-none rounded-md max-w-prose bg-slate-800 text-slate-100 print:hidden">
        <ProjectDiagram
          projectName={data?.projectBySlug?.name}
          epics={data?.projectBySlug?.epicsList}
        />
      </div>
      <div className="mx-auto prose dark:prose-invert ">
        {/* <TreeView epics={data.projectBySlug?.epicsList} /> */}

        <h1>
          Devis <strong>{data.projectBySlug?.name}</strong>
        </h1>

        <p
          dangerouslySetInnerHTML={
            data.projectBySlug?.description
              ? {
                  __html: data.projectBySlug?.description.replace(
                    /\n/g,
                    "<br />"
                  ),
                }
              : { __html: "" }
          }
        />

        <h2>Présentation du projet</h2>
        <p>{data.projectBySlug?.initialContext}</p>
        <p>
          Pour proposer une solution de redeveloppement des produits existants,
          Grinn a réalisé une analyse fonctionnelle détaillées du projet et une
          proposition technique associée. Tout est présenté dans ce document.
        </p>
        <h3>Les personas</h3>
        <ul>
          {data.projectBySlug?.personasList.map(persona => (
            <li key={persona.id}>
              <h4>{persona.name}</h4>
              <p
                dangerouslySetInnerHTML={
                  persona?.description
                    ? {
                        __html: persona?.description.replace(/\n/g, "<br />"),
                      }
                    : { __html: "" }
                }
              />
            </li>
          ))}
        </ul>

        <h3>
          Les blocs de fonctionnalités <em>(Epics)</em>
        </h3>
        <ul>
          {data.projectBySlug?.epicsList.map(epic => (
            <li key={epic.id}>
              <h4>{epic.name}</h4>
              <p
                dangerouslySetInnerHTML={
                  epic?.description
                    ? {
                        __html: epic?.description.replace(/\n/g, "<br />"),
                      }
                    : { __html: "" }
                }
              />
            </li>
          ))}
        </ul>

        <h2>Analyse des besoins fonctionnels et chiffrage</h2>
        {data.projectBySlug?.epicsList.map(epic => (
          <div key={epic.id}>
            <h2>{epic.name}</h2>
            <p
              dangerouslySetInnerHTML={
                epic?.description
                  ? {
                      __html: epic?.description.replace(/\n/g, "<br />"),
                    }
                  : { __html: "" }
              }
            />
            <>
              {epic.userStoriesList.map(us => (
                <Fragment key={us.id}>
                  <h3>{us.name}</h3>

                  <dl className="py-3 pl-4 text-sm border border-b-4 border-black rounded-md">
                    <div className="flex gap-2">
                      <dt className="text-sm italic opacity-70">En tant que</dt>
                      <dd>{us.personaByAsA?.name}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-sm italic opacity-70">Je veux</dt>
                      <dd>{us.iWant}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-sm italic opacity-70">Afin de</dt>
                      <dd>{us.soThat}</dd>
                    </div>
                  </dl>
                  <div>
                    {us.tasksList.length > 0 ? (
                      <table className="table-auto">
                        <thead>
                          <tr>
                            <th className="px-4 py-2">Nom</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Estimation</th>
                            <th>Incertitude</th>
                          </tr>
                        </thead>
                        <tbody>
                          {us.tasksList.map(task => (
                            <tr key={task.id}>
                              <td className="px-4 py-2 border">{task.name}</td>
                              <td className="px-4 py-2 border">
                                <p
                                  dangerouslySetInnerHTML={
                                    task?.description
                                      ? {
                                          __html: task?.description.replace(
                                            /\n/g,
                                            "<br />"
                                          ),
                                        }
                                      : { __html: "" }
                                  }
                                />
                              </td>
                              <td className="px-4 py-2 border">
                                {task.estimate} points
                              </td>
                              <td className="px-4 py-2 border">
                                {task.uncertainty} points
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <>
                        <blockquote>
                          <small>
                            Pas de tâches associées <br /> Estimation :{" "}
                            {us?.roughEstimate} points, soit{" "}
                            {(
                              (us?.roughEstimate *
                                data?.projectBySlug?.coeffLuidgy *
                                data?.projectBySlug?.dailyRate) /
                              data?.projectBySlug?.pointsPerDay
                            ).toLocaleString("fr-FR", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </small>
                        </blockquote>
                      </>
                    )}{" "}
                    <p
                      dangerouslySetInnerHTML={{
                        __html: us?.comments?.replace(/\n/g, "<br />") || "",
                      }}
                    />
                  </div>
                </Fragment>
              ))}
            </>
          </div>
        ))}
        <h2>Détails de la proposition technique</h2>
        <h3>Découpage du projet en domaines</h3>
        <p>
          Nous avons distingué différents domaines, correspondant aux différents
          champs techniques, dans lesquels nous allons mettre en plkace notre
          solution:
        </p>
        <ul>
          {data.projectBySlug?.domainsList.map(domain => (
            <li key={domain.id}>
              <h4>{domain.name}</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: domain?.description?.replace(/\n/g, "<br />") || "",
                }}
              />
            </li>
          ))}
        </ul>
        <h3>Architecture de la solution envisagée</h3>

        <h2>Proposition chifrée</h2>

        <h3>Rappel des user stories et couts associés</h3>
        <table>
          <thead>
            <tr>
              <th>US</th>
              <th>Prix HT</th>
              <th>Prix TTC</th>
            </tr>
          </thead>
          <tbody>
            {data.projectBySlug?.epicsList.map(epic => (
              <Fragment key={epic.id}>
                {epic.userStoriesList.map(us => (
                  <Fragment key={us.id}>
                    <tr>
                      <td>
                        {epic.name} - {us.name}
                      </td>

                      <td>
                        {(
                          (((us.tasksList.length > 0 ? 0 : us.roughEstimate) +
                            us.tasksList.reduce(
                              (acc, task) =>
                                acc + task.estimate + task.uncertainty / 2,
                              0
                            )) *
                            data.projectBySlug?.coeffLuidgy *
                            data.projectBySlug?.dailyRate) /
                          data.projectBySlug?.pointsPerDay
                        ).toLocaleString("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </td>
                      <td>
                        {(
                          (((us.tasksList.length > 0 ? 0 : us.roughEstimate) +
                            us.tasksList.reduce(
                              (acc, task) =>
                                acc + task.estimate + task.uncertainty / 2,
                              0
                            )) *
                            1.2 *
                            data.projectBySlug?.coeffLuidgy *
                            data.projectBySlug?.dailyRate) /
                          data.projectBySlug?.pointsPerDay
                        ).toLocaleString("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </td>
                    </tr>
                  </Fragment>
                ))}
                <tr className="bg-slate-200">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </Fragment>
            ))}
            <tr>
              <td>
                <strong>Total</strong>
              </td>

              <td>
                <strong>
                  {(
                    (data.projectBySlug?.epicsList
                      .map(epic =>
                        epic.userStoriesList.reduce(
                          (acc, us) =>
                            acc +
                            (us.tasksList.length > 0 ? 0 : us.roughEstimate) +
                            us.tasksList.reduce(
                              (acc, task) =>
                                acc + task.estimate + task.uncertainty / 2,
                              0
                            ),
                          0
                        )
                      )
                      .reduce((acc, us) => acc + us, 0) *
                      data.projectBySlug?.coeffLuidgy *
                      data.projectBySlug?.dailyRate) /
                    data.projectBySlug?.pointsPerDay
                  ).toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </strong>
              </td>
              <td>
                <strong>
                  {(
                    (data.projectBySlug?.epicsList
                      .map(epic =>
                        epic.userStoriesList.reduce(
                          (acc, us) =>
                            acc +
                            (us.tasksList.length > 0 ? 0 : us.roughEstimate) +
                            us.tasksList.reduce(
                              (acc, task) =>
                                acc + task.estimate + task.uncertainty / 2,
                              0
                            ),
                          0
                        )
                      )
                      .reduce((acc, us) => acc + us, 0) *
                      data.projectBySlug?.coeffLuidgy *
                      1.2 *
                      data.projectBySlug?.dailyRate) /
                    data.projectBySlug?.pointsPerDay
                  ).toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Devis;

export const fetchCache = "default-no-store";
