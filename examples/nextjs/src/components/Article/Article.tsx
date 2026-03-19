import { ArticleLink } from "./ArticleLink";
import styles from "./Article.module.css";

function Article() {
  return (
    <div className={styles["article"]}>
      <h2>Tariff Dispute Escalates as Governments Reassess Trade Strategy</h2>
      <p>
        <ArticleLink prompt="What are the latest tariffs announced?">
          A renewed wave of tariff measures announced this week
        </ArticleLink> {" "}
        has intensified tensions among several major trading partners, raising
        concerns among manufacturers and exporters about the stability of global
        supply chains.
      </p>
      <p>
        The policy changes center on a set of import duties targeting industrial
        metals, electronics components, and certain agricultural goods.
        Officials behind the measures argue that the tariffs are necessary to
        protect domestic industries that have faced years of price pressure from
        lower-cost imports. According to the trade ministry of one participating
        country, the duties are intended to{" "}
        <ArticleLink prompt="Are tariffs helping to 'restore fair competitive conditions for local producers'?">
          “restore fair competitive conditions” for local producers.
        </ArticleLink>
      </p>
      <p>
        However, trading partners affected by the decision have criticized the
        move, describing it as protectionist.{" "}
        <ArticleLink prompt="Which countries are against the new round of tariffs?">
          Several governments
        </ArticleLink>{" "}
        signaled that retaliatory tariffs may follow if negotiations fail to
        produce a compromise. Analysts warn that a cycle of reciprocal duties
        could emerge if the dispute expands.
      </p>
    </div>
  );
}

export { Article };
