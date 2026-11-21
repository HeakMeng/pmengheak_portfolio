import type { ComponentType } from "react";
import { Braces, Network } from "lucide-react";
import {
  SiApachekafka,
  SiDocker,
  SiFastapi,
  SiGit,
  SiGithubactions,
  SiGnubash,
  SiHibernate,
  SiJsonwebtokens,
  SiKeycloak,
  SiKotlin,
  SiNginx,
  SiOllama,
  SiOpenjdk,
  SiPostgresql,
  SiRabbitmq,
  SiSpringboot,
  SiSpringsecurity,
} from "react-icons/si";

type Icon = ComponentType<{ className?: string }>;

/** Icon for each entry in CORE_SKILLS; shared by the Skills grid and the hero ticker. */
const SKILL_ICONS: Record<string, Icon> = {
  Java: SiOpenjdk,
  "Spring Boot": SiSpringboot,
  "Spring Security": SiSpringsecurity,
  "JPA / Hibernate": SiHibernate,
  Microservices: Network,
  "REST APIs": Braces,
  PostgreSQL: SiPostgresql,
  Kafka: SiApachekafka,
  RabbitMQ: SiRabbitmq,
  Keycloak: SiKeycloak,
  "JWT / OAuth2": SiJsonwebtokens,
  Docker: SiDocker,
  Nginx: SiNginx,
  "GitHub Actions": SiGithubactions,
  "Linux / Bash": SiGnubash,
  Ollama: SiOllama,
  FastAPI: SiFastapi,
  "Kotlin / Compose": SiKotlin,
  Git: SiGit,
};

/** Brand/concept icon for a skill name, falling back to a generic code-brace icon. */
export function skillIcon(name: string): Icon {
  return SKILL_ICONS[name] ?? Braces;
}
