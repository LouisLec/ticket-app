// @ts-nocheck
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /**
   * A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
   * which securely represents claims between two parties.
   */
  Jwt: any;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** All input for the create `Domain` mutation. */
export type CreateDomainInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Domain` to be created by this mutation. */
  domain: DomainInput;
};

/** The output of our create `Domain` mutation. */
export type CreateDomainPayload = {
  __typename?: 'CreateDomainPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Domain` that was created by this mutation. */
  domain?: Maybe<Domain>;
  /** Reads a single `Project` that is related to this `Domain`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `Epic` mutation. */
export type CreateEpicInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Epic` to be created by this mutation. */
  epic: EpicInput;
};

/** The output of our create `Epic` mutation. */
export type CreateEpicPayload = {
  __typename?: 'CreateEpicPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Epic` that was created by this mutation. */
  epic?: Maybe<Epic>;
  /** An edge for our `Epic`. May be used by Relay 1. */
  epicEdge?: Maybe<EpicsEdge>;
  /** Reads a single `Project` that is related to this `Epic`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Epic` mutation. */
export type CreateEpicPayloadEpicEdgeArgs = {
  orderBy?: InputMaybe<Array<EpicsOrderBy>>;
};

/** All input for the create `Organization` mutation. */
export type CreateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Organization` to be created by this mutation. */
  organization: OrganizationInput;
};

/** All input for the create `OrganizationMembership` mutation. */
export type CreateOrganizationMembershipInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `OrganizationMembership` to be created by this mutation. */
  organizationMembership: OrganizationMembershipInput;
};

/** The output of our create `OrganizationMembership` mutation. */
export type CreateOrganizationMembershipPayload = {
  __typename?: 'CreateOrganizationMembershipPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Organization` that is related to this `OrganizationMembership`. */
  organization?: Maybe<Organization>;
  /** The `OrganizationMembership` that was created by this mutation. */
  organizationMembership?: Maybe<OrganizationMembership>;
  /** An edge for our `OrganizationMembership`. May be used by Relay 1. */
  organizationMembershipEdge?: Maybe<OrganizationMembershipsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `OrganizationMembership`. */
  user?: Maybe<User>;
};


/** The output of our create `OrganizationMembership` mutation. */
export type CreateOrganizationMembershipPayloadOrganizationMembershipEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};

/** The output of our create `Organization` mutation. */
export type CreateOrganizationPayload = {
  __typename?: 'CreateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Organization` that was created by this mutation. */
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Organization` mutation. */
export type CreateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};

/** All input for the create `Persona` mutation. */
export type CreatePersonaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Persona` to be created by this mutation. */
  persona: PersonaInput;
};

/** The output of our create `Persona` mutation. */
export type CreatePersonaPayload = {
  __typename?: 'CreatePersonaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Persona` that was created by this mutation. */
  persona?: Maybe<Persona>;
  /** Reads a single `Project` that is related to this `Persona`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `Project` mutation. */
export type CreateProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Project` to be created by this mutation. */
  project: ProjectInput;
};

/** The output of our create `Project` mutation. */
export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Organization` that is related to this `Project`. */
  organization?: Maybe<Organization>;
  /** The `Project` that was created by this mutation. */
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Project` mutation. */
export type CreateProjectPayloadProjectEdgeArgs = {
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

/** All input for the create `Task` mutation. */
export type CreateTaskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Task` to be created by this mutation. */
  task: TaskInput;
};

/** The output of our create `Task` mutation. */
export type CreateTaskPayload = {
  __typename?: 'CreateTaskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Domain` that is related to this `Task`. */
  domain?: Maybe<Domain>;
  /** Reads a single `Task` that is related to this `Task`. */
  parent?: Maybe<Task>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Task` that was created by this mutation. */
  task?: Maybe<Task>;
  /** An edge for our `Task`. May be used by Relay 1. */
  taskEdge?: Maybe<TasksEdge>;
  /** Reads a single `UserStory` that is related to this `Task`. */
  userStory?: Maybe<UserStory>;
};


/** The output of our create `Task` mutation. */
export type CreateTaskPayloadTaskEdgeArgs = {
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** All input for the create `UserStory` mutation. */
export type CreateUserStoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `UserStory` to be created by this mutation. */
  userStory: UserStoryInput;
};

/** The output of our create `UserStory` mutation. */
export type CreateUserStoryPayload = {
  __typename?: 'CreateUserStoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Epic` that is related to this `UserStory`. */
  epic?: Maybe<Epic>;
  /** Reads a single `UserStory` that is related to this `UserStory`. */
  parent?: Maybe<UserStory>;
  /** Reads a single `Persona` that is related to this `UserStory`. */
  personaByAsA?: Maybe<Persona>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UserStory` that was created by this mutation. */
  userStory?: Maybe<UserStory>;
  /** An edge for our `UserStory`. May be used by Relay 1. */
  userStoryEdge?: Maybe<UserStoriesEdge>;
};


/** The output of our create `UserStory` mutation. */
export type CreateUserStoryPayloadUserStoryEdgeArgs = {
  orderBy?: InputMaybe<Array<UserStoriesOrderBy>>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']>>;
};

/** All input for the `deleteDomainByNodeId` mutation. */
export type DeleteDomainByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Domain` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteDomain` mutation. */
export type DeleteDomainInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Domain` mutation. */
export type DeleteDomainPayload = {
  __typename?: 'DeleteDomainPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedDomainNodeId?: Maybe<Scalars['ID']>;
  /** The `Domain` that was deleted by this mutation. */
  domain?: Maybe<Domain>;
  /** Reads a single `Project` that is related to this `Domain`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteEpicByNodeId` mutation. */
export type DeleteEpicByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Epic` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteEpic` mutation. */
export type DeleteEpicInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Epic` mutation. */
export type DeleteEpicPayload = {
  __typename?: 'DeleteEpicPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedEpicNodeId?: Maybe<Scalars['ID']>;
  /** The `Epic` that was deleted by this mutation. */
  epic?: Maybe<Epic>;
  /** An edge for our `Epic`. May be used by Relay 1. */
  epicEdge?: Maybe<EpicsEdge>;
  /** Reads a single `Project` that is related to this `Epic`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Epic` mutation. */
export type DeleteEpicPayloadEpicEdgeArgs = {
  orderBy?: InputMaybe<Array<EpicsOrderBy>>;
};

export type DeleteFileInput = {
  key: Scalars['String'];
};

export type DeleteFilePayload = {
  __typename?: 'DeleteFilePayload';
  success?: Maybe<Scalars['Boolean']>;
};

/** All input for the `deleteOrganizationByName` mutation. */
export type DeleteOrganizationByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

/** All input for the `deleteOrganizationByNodeId` mutation. */
export type DeleteOrganizationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Organization` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteOrganizationBySlug` mutation. */
export type DeleteOrganizationBySlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  slug: Scalars['String'];
};

/** All input for the `deleteOrganization` mutation. */
export type DeleteOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteOrganizationMembershipByNodeId` mutation. */
export type DeleteOrganizationMembershipByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `OrganizationMembership` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteOrganizationMembershipByOrganizationIdAndUserId` mutation. */
export type DeleteOrganizationMembershipByOrganizationIdAndUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
};

/** All input for the `deleteOrganizationMembership` mutation. */
export type DeleteOrganizationMembershipInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `OrganizationMembership` mutation. */
export type DeleteOrganizationMembershipPayload = {
  __typename?: 'DeleteOrganizationMembershipPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedOrganizationMembershipNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Organization` that is related to this `OrganizationMembership`. */
  organization?: Maybe<Organization>;
  /** The `OrganizationMembership` that was deleted by this mutation. */
  organizationMembership?: Maybe<OrganizationMembership>;
  /** An edge for our `OrganizationMembership`. May be used by Relay 1. */
  organizationMembershipEdge?: Maybe<OrganizationMembershipsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `OrganizationMembership`. */
  user?: Maybe<User>;
};


/** The output of our delete `OrganizationMembership` mutation. */
export type DeleteOrganizationMembershipPayloadOrganizationMembershipEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};

/** The output of our delete `Organization` mutation. */
export type DeleteOrganizationPayload = {
  __typename?: 'DeleteOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedOrganizationNodeId?: Maybe<Scalars['ID']>;
  /** The `Organization` that was deleted by this mutation. */
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Organization` mutation. */
export type DeleteOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `deletePersonaByNodeId` mutation. */
export type DeletePersonaByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Persona` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePersona` mutation. */
export type DeletePersonaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Persona` mutation. */
export type DeletePersonaPayload = {
  __typename?: 'DeletePersonaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedPersonaNodeId?: Maybe<Scalars['ID']>;
  /** The `Persona` that was deleted by this mutation. */
  persona?: Maybe<Persona>;
  /** Reads a single `Project` that is related to this `Persona`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteProjectByNodeId` mutation. */
export type DeleteProjectByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Project` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteProjectByOrganizationIdAndName` mutation. */
export type DeleteProjectByOrganizationIdAndNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
};

/** All input for the `deleteProjectByOrganizationIdAndSlug` mutation. */
export type DeleteProjectByOrganizationIdAndSlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  slug: Scalars['String'];
};

/** All input for the `deleteProject` mutation. */
export type DeleteProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Project` mutation. */
export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedProjectNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Organization` that is related to this `Project`. */
  organization?: Maybe<Organization>;
  /** The `Project` that was deleted by this mutation. */
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Project` mutation. */
export type DeleteProjectPayloadProjectEdgeArgs = {
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

/** All input for the `deleteTaskByNodeId` mutation. */
export type DeleteTaskByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Task` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteTask` mutation. */
export type DeleteTaskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `Task` mutation. */
export type DeleteTaskPayload = {
  __typename?: 'DeleteTaskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedTaskNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Domain` that is related to this `Task`. */
  domain?: Maybe<Domain>;
  /** Reads a single `Task` that is related to this `Task`. */
  parent?: Maybe<Task>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Task` that was deleted by this mutation. */
  task?: Maybe<Task>;
  /** An edge for our `Task`. May be used by Relay 1. */
  taskEdge?: Maybe<TasksEdge>;
  /** Reads a single `UserStory` that is related to this `Task`. */
  userStory?: Maybe<UserStory>;
};


/** The output of our delete `Task` mutation. */
export type DeleteTaskPayloadTaskEdgeArgs = {
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

/** All input for the `deleteUserByEmail` mutation. */
export type DeleteUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

/** All input for the `deleteUserByNodeId` mutation. */
export type DeleteUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedUserNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** All input for the `deleteUserStoryByNodeId` mutation. */
export type DeleteUserStoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserStory` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUserStory` mutation. */
export type DeleteUserStoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** The output of our delete `UserStory` mutation. */
export type DeleteUserStoryPayload = {
  __typename?: 'DeleteUserStoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedUserStoryNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Epic` that is related to this `UserStory`. */
  epic?: Maybe<Epic>;
  /** Reads a single `UserStory` that is related to this `UserStory`. */
  parent?: Maybe<UserStory>;
  /** Reads a single `Persona` that is related to this `UserStory`. */
  personaByAsA?: Maybe<Persona>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UserStory` that was deleted by this mutation. */
  userStory?: Maybe<UserStory>;
  /** An edge for our `UserStory`. May be used by Relay 1. */
  userStoryEdge?: Maybe<UserStoriesEdge>;
};


/** The output of our delete `UserStory` mutation. */
export type DeleteUserStoryPayloadUserStoryEdgeArgs = {
  orderBy?: InputMaybe<Array<UserStoriesOrderBy>>;
};

/** An area of the project, such as DB, backend, frontend... */
export type Domain = Node & {
  __typename?: 'Domain';
  color: Scalars['String'];
  createdAt: Scalars['Datetime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  order?: Maybe<Scalars['Int']>;
  /** Reads a single `Project` that is related to this `Domain`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID'];
  shortName: Scalars['String'];
  /** Reads and enables pagination through a set of `Task`. */
  tasks: TasksConnection;
  /** Reads and enables pagination through a set of `Task`. */
  tasksList: Array<Task>;
  updatedAt: Scalars['Datetime'];
};


/** An area of the project, such as DB, backend, frontend... */
export type DomainTasksArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};


/** An area of the project, such as DB, backend, frontend... */
export type DomainTasksListArgs = {
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

/** A condition to be used against `Domain` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type DomainCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `order` field. */
  order?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Domain` object types. All fields are combined with a logical ‘and.’ */
export type DomainFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<DomainFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<DomainFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<DomainFilter>>;
  /** Filter by the object’s `order` field. */
  order?: InputMaybe<IntFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Domain` */
export type DomainInput = {
  color: Scalars['String'];
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['UUID'];
  shortName: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Domain`. Fields that are set will be updated. */
export type DomainPatch = {
  color?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['UUID']>;
  shortName?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Methods to use when ordering `Domain`. */
export enum DomainsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrderAsc = 'ORDER_ASC',
  OrderDesc = 'ORDER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A precisely defined action of a persona using the project. */
export type Epic = Node & {
  __typename?: 'Epic';
  createdAt: Scalars['Datetime'];
  description: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  order?: Maybe<Scalars['Int']>;
  /** Reads a single `Project` that is related to this `Epic`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID'];
  updatedAt: Scalars['Datetime'];
  /** Reads and enables pagination through a set of `UserStory`. */
  userStories: UserStoriesConnection;
  /** Reads and enables pagination through a set of `UserStory`. */
  userStoriesList: Array<UserStory>;
};


/** A precisely defined action of a persona using the project. */
export type EpicUserStoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<UserStoryCondition>;
  filter?: InputMaybe<UserStoryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserStoriesOrderBy>>;
};


/** A precisely defined action of a persona using the project. */
export type EpicUserStoriesListArgs = {
  condition?: InputMaybe<UserStoryCondition>;
  filter?: InputMaybe<UserStoryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserStoriesOrderBy>>;
};

/** A condition to be used against `Epic` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EpicCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `order` field. */
  order?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Epic` object types. All fields are combined with a logical ‘and.’ */
export type EpicFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EpicFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EpicFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EpicFilter>>;
  /** Filter by the object’s `order` field. */
  order?: InputMaybe<IntFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Epic` */
export type EpicInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description: Scalars['String'];
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['UUID'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Epic`. Fields that are set will be updated. */
export type EpicPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `Epic` values. */
export type EpicsConnection = {
  __typename?: 'EpicsConnection';
  /** A list of edges which contains the `Epic` and cursor to aid in pagination. */
  edges: Array<EpicsEdge>;
  /** A list of `Epic` objects. */
  nodes: Array<Epic>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Epic` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Epic` edge in the connection. */
export type EpicsEdge = {
  __typename?: 'EpicsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Epic` at the end of the edge. */
  node: Epic;
};

/** Methods to use when ordering `Epic`. */
export enum EpicsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrderAsc = 'ORDER_ASC',
  OrderDesc = 'ORDER_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type GeneratePresignedPostInput = {
  key: Scalars['String'];
};

export type GeneratePresignedPostPayload = {
  __typename?: 'GeneratePresignedPostPayload';
  fields?: Maybe<Scalars['JSON']>;
  url?: Maybe<Scalars['String']>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

/** All input for the `login` mutation. */
export type LoginInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

/** The output of our `login` mutation. */
export type LoginPayload = {
  __typename?: 'LoginPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  jwt?: Maybe<Scalars['Jwt']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Domain`. */
  createDomain?: Maybe<CreateDomainPayload>;
  /** Creates a single `Epic`. */
  createEpic?: Maybe<CreateEpicPayload>;
  /** Creates a single `Organization`. */
  createOrganization?: Maybe<CreateOrganizationPayload>;
  /** Creates a single `OrganizationMembership`. */
  createOrganizationMembership?: Maybe<CreateOrganizationMembershipPayload>;
  /** Creates a single `Persona`. */
  createPersona?: Maybe<CreatePersonaPayload>;
  /** Creates a single `Project`. */
  createProject?: Maybe<CreateProjectPayload>;
  /** Creates a single `Task`. */
  createTask?: Maybe<CreateTaskPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `UserStory`. */
  createUserStory?: Maybe<CreateUserStoryPayload>;
  /** Deletes a single `Domain` using a unique key. */
  deleteDomain?: Maybe<DeleteDomainPayload>;
  /** Deletes a single `Domain` using its globally unique id. */
  deleteDomainByNodeId?: Maybe<DeleteDomainPayload>;
  /** Deletes a single `Epic` using a unique key. */
  deleteEpic?: Maybe<DeleteEpicPayload>;
  /** Deletes a single `Epic` using its globally unique id. */
  deleteEpicByNodeId?: Maybe<DeleteEpicPayload>;
  deleteFile?: Maybe<DeleteFilePayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganization?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganizationByName?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using its globally unique id. */
  deleteOrganizationByNodeId?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `Organization` using a unique key. */
  deleteOrganizationBySlug?: Maybe<DeleteOrganizationPayload>;
  /** Deletes a single `OrganizationMembership` using a unique key. */
  deleteOrganizationMembership?: Maybe<DeleteOrganizationMembershipPayload>;
  /** Deletes a single `OrganizationMembership` using its globally unique id. */
  deleteOrganizationMembershipByNodeId?: Maybe<DeleteOrganizationMembershipPayload>;
  /** Deletes a single `OrganizationMembership` using a unique key. */
  deleteOrganizationMembershipByOrganizationIdAndUserId?: Maybe<DeleteOrganizationMembershipPayload>;
  /** Deletes a single `Persona` using a unique key. */
  deletePersona?: Maybe<DeletePersonaPayload>;
  /** Deletes a single `Persona` using its globally unique id. */
  deletePersonaByNodeId?: Maybe<DeletePersonaPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using its globally unique id. */
  deleteProjectByNodeId?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProjectByOrganizationIdAndName?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProjectByOrganizationIdAndSlug?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Task` using a unique key. */
  deleteTask?: Maybe<DeleteTaskPayload>;
  /** Deletes a single `Task` using its globally unique id. */
  deleteTaskByNodeId?: Maybe<DeleteTaskPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByEmail?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUserByNodeId?: Maybe<DeleteUserPayload>;
  /** Deletes a single `UserStory` using a unique key. */
  deleteUserStory?: Maybe<DeleteUserStoryPayload>;
  /** Deletes a single `UserStory` using its globally unique id. */
  deleteUserStoryByNodeId?: Maybe<DeleteUserStoryPayload>;
  generatePresignedPost?: Maybe<GeneratePresignedPostPayload>;
  login?: Maybe<LoginPayload>;
  register?: Maybe<RegisterPayload>;
  /** Updates a single `Domain` using a unique key and a patch. */
  updateDomain?: Maybe<UpdateDomainPayload>;
  /** Updates a single `Domain` using its globally unique id and a patch. */
  updateDomainByNodeId?: Maybe<UpdateDomainPayload>;
  /** Updates a single `Epic` using a unique key and a patch. */
  updateEpic?: Maybe<UpdateEpicPayload>;
  /** Updates a single `Epic` using its globally unique id and a patch. */
  updateEpicByNodeId?: Maybe<UpdateEpicPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganization?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganizationByName?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using its globally unique id and a patch. */
  updateOrganizationByNodeId?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `Organization` using a unique key and a patch. */
  updateOrganizationBySlug?: Maybe<UpdateOrganizationPayload>;
  /** Updates a single `OrganizationMembership` using a unique key and a patch. */
  updateOrganizationMembership?: Maybe<UpdateOrganizationMembershipPayload>;
  /** Updates a single `OrganizationMembership` using its globally unique id and a patch. */
  updateOrganizationMembershipByNodeId?: Maybe<UpdateOrganizationMembershipPayload>;
  /** Updates a single `OrganizationMembership` using a unique key and a patch. */
  updateOrganizationMembershipByOrganizationIdAndUserId?: Maybe<UpdateOrganizationMembershipPayload>;
  /** Updates a single `Persona` using a unique key and a patch. */
  updatePersona?: Maybe<UpdatePersonaPayload>;
  /** Updates a single `Persona` using its globally unique id and a patch. */
  updatePersonaByNodeId?: Maybe<UpdatePersonaPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using its globally unique id and a patch. */
  updateProjectByNodeId?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProjectByOrganizationIdAndName?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProjectByOrganizationIdAndSlug?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Task` using a unique key and a patch. */
  updateTask?: Maybe<UpdateTaskPayload>;
  /** Updates a single `Task` using its globally unique id and a patch. */
  updateTaskByNodeId?: Maybe<UpdateTaskPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByEmail?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUserByNodeId?: Maybe<UpdateUserPayload>;
  /** Updates a single `UserStory` using a unique key and a patch. */
  updateUserStory?: Maybe<UpdateUserStoryPayload>;
  /** Updates a single `UserStory` using its globally unique id and a patch. */
  updateUserStoryByNodeId?: Maybe<UpdateUserStoryPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDomainArgs = {
  input: CreateDomainInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEpicArgs = {
  input: CreateEpicInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateOrganizationMembershipArgs = {
  input: CreateOrganizationMembershipInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePersonaArgs = {
  input: CreatePersonaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserStoryArgs = {
  input: CreateUserStoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDomainArgs = {
  input: DeleteDomainInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDomainByNodeIdArgs = {
  input: DeleteDomainByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpicArgs = {
  input: DeleteEpicInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEpicByNodeIdArgs = {
  input: DeleteEpicByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFileArgs = {
  input: DeleteFileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationArgs = {
  input: DeleteOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationByNameArgs = {
  input: DeleteOrganizationByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationByNodeIdArgs = {
  input: DeleteOrganizationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationBySlugArgs = {
  input: DeleteOrganizationBySlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationMembershipArgs = {
  input: DeleteOrganizationMembershipInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationMembershipByNodeIdArgs = {
  input: DeleteOrganizationMembershipByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteOrganizationMembershipByOrganizationIdAndUserIdArgs = {
  input: DeleteOrganizationMembershipByOrganizationIdAndUserIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePersonaArgs = {
  input: DeletePersonaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePersonaByNodeIdArgs = {
  input: DeletePersonaByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectByNodeIdArgs = {
  input: DeleteProjectByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectByOrganizationIdAndNameArgs = {
  input: DeleteProjectByOrganizationIdAndNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectByOrganizationIdAndSlugArgs = {
  input: DeleteProjectByOrganizationIdAndSlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTaskByNodeIdArgs = {
  input: DeleteTaskByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByEmailArgs = {
  input: DeleteUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByNodeIdArgs = {
  input: DeleteUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserStoryArgs = {
  input: DeleteUserStoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserStoryByNodeIdArgs = {
  input: DeleteUserStoryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGeneratePresignedPostArgs = {
  input: GeneratePresignedPostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationLoginArgs = {
  input: LoginInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterArgs = {
  input: RegisterInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDomainArgs = {
  input: UpdateDomainInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDomainByNodeIdArgs = {
  input: UpdateDomainByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpicArgs = {
  input: UpdateEpicInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEpicByNodeIdArgs = {
  input: UpdateEpicByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationByNameArgs = {
  input: UpdateOrganizationByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationByNodeIdArgs = {
  input: UpdateOrganizationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationBySlugArgs = {
  input: UpdateOrganizationBySlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationMembershipArgs = {
  input: UpdateOrganizationMembershipInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationMembershipByNodeIdArgs = {
  input: UpdateOrganizationMembershipByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateOrganizationMembershipByOrganizationIdAndUserIdArgs = {
  input: UpdateOrganizationMembershipByOrganizationIdAndUserIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePersonaArgs = {
  input: UpdatePersonaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePersonaByNodeIdArgs = {
  input: UpdatePersonaByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectByNodeIdArgs = {
  input: UpdateProjectByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectByOrganizationIdAndNameArgs = {
  input: UpdateProjectByOrganizationIdAndNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectByOrganizationIdAndSlugArgs = {
  input: UpdateProjectByOrganizationIdAndSlugInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTaskByNodeIdArgs = {
  input: UpdateTaskByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByEmailArgs = {
  input: UpdateUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByNodeIdArgs = {
  input: UpdateUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserStoryArgs = {
  input: UpdateUserStoryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserStoryByNodeIdArgs = {
  input: UpdateUserStoryByNodeIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** A company, organization, or institution. */
export type Organization = Node & {
  __typename?: 'Organization';
  createdAt: Scalars['Datetime'];
  description: Scalars['String'];
  id: Scalars['UUID'];
  /** The URL of the organization's logo. */
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `OrganizationMembership`. */
  organizationMemberships: OrganizationMembershipsConnection;
  /** Reads and enables pagination through a set of `Project`. */
  projects: ProjectsConnection;
  slug: Scalars['String'];
  updatedAt: Scalars['Datetime'];
};


/** A company, organization, or institution. */
export type OrganizationOrganizationMembershipsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationMembershipCondition>;
  filter?: InputMaybe<OrganizationMembershipFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};


/** A company, organization, or institution. */
export type OrganizationProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

/**
 * A condition to be used against `Organization` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type OrganizationCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Organization` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<OrganizationFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<OrganizationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<OrganizationFilter>>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Organization` */
export type OrganizationInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['UUID']>;
  /** The URL of the organization's logo. */
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type OrganizationMembership = Node & {
  __typename?: 'OrganizationMembership';
  createdAt: Scalars['Datetime'];
  id: Scalars['UUID'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Organization` that is related to this `OrganizationMembership`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  role: OrganizationMembershipsRolesEnum;
  updatedAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `OrganizationMembership`. */
  user?: Maybe<User>;
  userId: Scalars['UUID'];
};

/**
 * A condition to be used against `OrganizationMembership` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type OrganizationMembershipCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `role` field. */
  role?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A filter to be used against `OrganizationMembership` object types. All fields are combined with a logical ‘and.’ */
export type OrganizationMembershipFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<OrganizationMembershipFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<OrganizationMembershipFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<OrganizationMembershipFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `role` field. */
  role?: InputMaybe<OrganizationMembershipsRolesEnumFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `OrganizationMembership` */
export type OrganizationMembershipInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  organizationId: Scalars['UUID'];
  role?: InputMaybe<OrganizationMembershipsRolesEnum>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userId: Scalars['UUID'];
};

/** Represents an update to a `OrganizationMembership`. Fields that are set will be updated. */
export type OrganizationMembershipPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  organizationId?: InputMaybe<Scalars['UUID']>;
  role?: InputMaybe<OrganizationMembershipsRolesEnum>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A connection to a list of `OrganizationMembership` values. */
export type OrganizationMembershipsConnection = {
  __typename?: 'OrganizationMembershipsConnection';
  /** A list of edges which contains the `OrganizationMembership` and cursor to aid in pagination. */
  edges: Array<OrganizationMembershipsEdge>;
  /** A list of `OrganizationMembership` objects. */
  nodes: Array<OrganizationMembership>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `OrganizationMembership` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `OrganizationMembership` edge in the connection. */
export type OrganizationMembershipsEdge = {
  __typename?: 'OrganizationMembershipsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `OrganizationMembership` at the end of the edge. */
  node: OrganizationMembership;
};

/** Methods to use when ordering `OrganizationMembership`. */
export enum OrganizationMembershipsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RoleAsc = 'ROLE_ASC',
  RoleDesc = 'ROLE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

export enum OrganizationMembershipsRolesEnum {
  /** Admin of the organization */
  Admin = 'ADMIN',
  /** Client of the organization */
  Client = 'CLIENT',
  /** Member of the organization */
  Developer = 'DEVELOPER',
  /** Guest of the organization */
  Guest = 'GUEST',
  /** Manager of the organization */
  Manager = 'MANAGER',
  /** Owner of the organization */
  Owner = 'OWNER'
}

/** A filter to be used against OrganizationMembershipsRolesEnum fields. All fields are combined with a logical ‘and.’ */
export type OrganizationMembershipsRolesEnumFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<OrganizationMembershipsRolesEnum>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<OrganizationMembershipsRolesEnum>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<OrganizationMembershipsRolesEnum>>;
};

/** Represents an update to a `Organization`. Fields that are set will be updated. */
export type OrganizationPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  /** The URL of the organization's logo. */
  logoUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `Organization` values. */
export type OrganizationsConnection = {
  __typename?: 'OrganizationsConnection';
  /** A list of edges which contains the `Organization` and cursor to aid in pagination. */
  edges: Array<OrganizationsEdge>;
  /** A list of `Organization` objects. */
  nodes: Array<Organization>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Organization` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Organization` edge in the connection. */
export type OrganizationsEdge = {
  __typename?: 'OrganizationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Organization` at the end of the edge. */
  node: Organization;
};

/** Methods to use when ordering `Organization`. */
export enum OrganizationsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

/** A typical user of the project, such as a developer, a designer, a manager, etc. */
export type Persona = Node & {
  __typename?: 'Persona';
  createdAt: Scalars['Datetime'];
  description: Scalars['String'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Project` that is related to this `Persona`. */
  project?: Maybe<Project>;
  projectId: Scalars['UUID'];
  shortName: Scalars['String'];
  updatedAt: Scalars['Datetime'];
  /** Reads and enables pagination through a set of `UserStory`. */
  userStoriesByAsA: UserStoriesConnection;
  /** Reads and enables pagination through a set of `UserStory`. */
  userStoriesByAsAList: Array<UserStory>;
};


/** A typical user of the project, such as a developer, a designer, a manager, etc. */
export type PersonaUserStoriesByAsAArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<UserStoryCondition>;
  filter?: InputMaybe<UserStoryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserStoriesOrderBy>>;
};


/** A typical user of the project, such as a developer, a designer, a manager, etc. */
export type PersonaUserStoriesByAsAListArgs = {
  condition?: InputMaybe<UserStoryCondition>;
  filter?: InputMaybe<UserStoryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserStoriesOrderBy>>;
};

/** A condition to be used against `Persona` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PersonaCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Persona` object types. All fields are combined with a logical ‘and.’ */
export type PersonaFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PersonaFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PersonaFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PersonaFilter>>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Persona` */
export type PersonaInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['UUID']>;
  name: Scalars['String'];
  projectId: Scalars['UUID'];
  shortName: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Persona`. Fields that are set will be updated. */
export type PersonaPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['UUID']>;
  shortName?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Methods to use when ordering `Persona`. */
export enum PersonasOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type Project = Node & {
  __typename?: 'Project';
  createdAt: Scalars['Datetime'];
  description: Scalars['String'];
  /** Reads and enables pagination through a set of `Domain`. */
  domainsList: Array<Domain>;
  /** Reads and enables pagination through a set of `Epic`. */
  epics: EpicsConnection;
  /** Reads and enables pagination through a set of `Epic`. */
  epicsList: Array<Epic>;
  id: Scalars['UUID'];
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Organization` that is related to this `Project`. */
  organization?: Maybe<Organization>;
  organizationId: Scalars['UUID'];
  /** Reads and enables pagination through a set of `Persona`. */
  personasList: Array<Persona>;
  slug: Scalars['String'];
  updatedAt: Scalars['Datetime'];
};


export type ProjectDomainsListArgs = {
  condition?: InputMaybe<DomainCondition>;
  filter?: InputMaybe<DomainFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DomainsOrderBy>>;
};


export type ProjectEpicsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<EpicCondition>;
  filter?: InputMaybe<EpicFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EpicsOrderBy>>;
};


export type ProjectEpicsListArgs = {
  condition?: InputMaybe<EpicCondition>;
  filter?: InputMaybe<EpicFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EpicsOrderBy>>;
};


export type ProjectPersonasListArgs = {
  condition?: InputMaybe<PersonaCondition>;
  filter?: InputMaybe<PersonaFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PersonasOrderBy>>;
};

/** A condition to be used against `Project` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ProjectCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `organizationId` field. */
  organizationId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Project` object types. All fields are combined with a logical ‘and.’ */
export type ProjectFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ProjectFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ProjectFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProjectFilter>>;
  /** Filter by the object’s `organizationId` field. */
  organizationId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Project` */
export type ProjectInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description: Scalars['String'];
  id?: InputMaybe<Scalars['UUID']>;
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
  slug: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Project`. Fields that are set will be updated. */
export type ProjectPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  organizationId?: InputMaybe<Scalars['UUID']>;
  slug?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `Project` values. */
export type ProjectsConnection = {
  __typename?: 'ProjectsConnection';
  /** A list of edges which contains the `Project` and cursor to aid in pagination. */
  edges: Array<ProjectsEdge>;
  /** A list of `Project` objects. */
  nodes: Array<Project>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection. */
export type ProjectsEdge = {
  __typename?: 'ProjectsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node: Project;
};

/** Methods to use when ordering `Project`. */
export enum ProjectsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrganizationIdAsc = 'ORGANIZATION_ID_ASC',
  OrganizationIdDesc = 'ORGANIZATION_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** The currently logged in user (or null if not logged in). */
  currentUser?: Maybe<User>;
  /** Handy method to get the current user ID. */
  currentUserId?: Maybe<Scalars['UUID']>;
  domain?: Maybe<Domain>;
  /** Reads a single `Domain` using its globally unique `ID`. */
  domainByNodeId?: Maybe<Domain>;
  /** Reads a set of `Domain`. */
  domainsList?: Maybe<Array<Domain>>;
  epic?: Maybe<Epic>;
  /** Reads a single `Epic` using its globally unique `ID`. */
  epicByNodeId?: Maybe<Epic>;
  /** Reads and enables pagination through a set of `Epic`. */
  epics?: Maybe<EpicsConnection>;
  /** Reads a set of `Epic`. */
  epicsList?: Maybe<Array<Epic>>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  organization?: Maybe<Organization>;
  organizationByName?: Maybe<Organization>;
  /** Reads a single `Organization` using its globally unique `ID`. */
  organizationByNodeId?: Maybe<Organization>;
  organizationBySlug?: Maybe<Organization>;
  organizationMembership?: Maybe<OrganizationMembership>;
  /** Reads a single `OrganizationMembership` using its globally unique `ID`. */
  organizationMembershipByNodeId?: Maybe<OrganizationMembership>;
  organizationMembershipByOrganizationIdAndUserId?: Maybe<OrganizationMembership>;
  /** Reads and enables pagination through a set of `OrganizationMembership`. */
  organizationMemberships?: Maybe<OrganizationMembershipsConnection>;
  /** Reads and enables pagination through a set of `Organization`. */
  organizations?: Maybe<OrganizationsConnection>;
  persona?: Maybe<Persona>;
  /** Reads a single `Persona` using its globally unique `ID`. */
  personaByNodeId?: Maybe<Persona>;
  /** Reads a set of `Persona`. */
  personasList?: Maybe<Array<Persona>>;
  project?: Maybe<Project>;
  /** Reads a single `Project` using its globally unique `ID`. */
  projectByNodeId?: Maybe<Project>;
  projectByOrganizationIdAndName?: Maybe<Project>;
  projectByOrganizationIdAndSlug?: Maybe<Project>;
  projectBySlug?: Maybe<Project>;
  /** Reads and enables pagination through a set of `Project`. */
  projects?: Maybe<ProjectsConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  task?: Maybe<Task>;
  /** Reads a single `Task` using its globally unique `ID`. */
  taskByNodeId?: Maybe<Task>;
  /** Reads and enables pagination through a set of `Task`. */
  tasks?: Maybe<TasksConnection>;
  /** Reads a set of `Task`. */
  tasksList?: Maybe<Array<Task>>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  /** Reads a single `User` using its globally unique `ID`. */
  userByNodeId?: Maybe<User>;
  /** Reads and enables pagination through a set of `UserStory`. */
  userStories?: Maybe<UserStoriesConnection>;
  /** Reads a set of `UserStory`. */
  userStoriesList?: Maybe<Array<UserStory>>;
  userStory?: Maybe<UserStory>;
  /** Reads a single `UserStory` using its globally unique `ID`. */
  userStoryByNodeId?: Maybe<UserStory>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDomainArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDomainByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDomainsListArgs = {
  condition?: InputMaybe<DomainCondition>;
  filter?: InputMaybe<DomainFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DomainsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEpicArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpicByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEpicsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<EpicCondition>;
  filter?: InputMaybe<EpicFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EpicsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEpicsListArgs = {
  condition?: InputMaybe<EpicCondition>;
  filter?: InputMaybe<EpicFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EpicsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationByNameArgs = {
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationBySlugArgs = {
  slug: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationMembershipArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationMembershipByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationMembershipByOrganizationIdAndUserIdArgs = {
  organizationId: Scalars['UUID'];
  userId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationMembershipsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationMembershipCondition>;
  filter?: InputMaybe<OrganizationMembershipFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryOrganizationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationCondition>;
  filter?: InputMaybe<OrganizationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPersonaArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPersonaByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPersonasListArgs = {
  condition?: InputMaybe<PersonaCondition>;
  filter?: InputMaybe<PersonaFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PersonasOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByOrganizationIdAndNameArgs = {
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByOrganizationIdAndSlugArgs = {
  organizationId: Scalars['UUID'];
  slug: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectBySlugArgs = {
  organizationSlug?: InputMaybe<Scalars['String']>;
  projectSlug?: InputMaybe<Scalars['String']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTaskArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTaskByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTasksArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTasksListArgs = {
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserStoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<UserStoryCondition>;
  filter?: InputMaybe<UserStoryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserStoriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserStoriesListArgs = {
  condition?: InputMaybe<UserStoryCondition>;
  filter?: InputMaybe<UserStoryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserStoriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserStoryArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserStoryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<UserCondition>;
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** All input for the `register` mutation. */
export type RegisterInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

/** The output of our `register` mutation. */
export type RegisterPayload = {
  __typename?: 'RegisterPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  jwt?: Maybe<Scalars['Jwt']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']>;
};

/** A precisely defined action of a persona using the project. */
export type Task = Node & {
  __typename?: 'Task';
  /** Reads and enables pagination through a set of `Task`. */
  childTasks: TasksConnection;
  /** Reads and enables pagination through a set of `Task`. */
  childTasksList: Array<Task>;
  createdAt: Scalars['Datetime'];
  description: Scalars['String'];
  /** Reads a single `Domain` that is related to this `Task`. */
  domain?: Maybe<Domain>;
  domainId?: Maybe<Scalars['UUID']>;
  estimate: Scalars['Int'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  order?: Maybe<Scalars['Int']>;
  /** Reads a single `Task` that is related to this `Task`. */
  parent?: Maybe<Task>;
  parentId?: Maybe<Scalars['UUID']>;
  status?: Maybe<TaskStatus>;
  uncertainty: Scalars['Int'];
  updatedAt: Scalars['Datetime'];
  /** Reads a single `UserStory` that is related to this `Task`. */
  userStory?: Maybe<UserStory>;
  userStoryId: Scalars['UUID'];
};


/** A precisely defined action of a persona using the project. */
export type TaskChildTasksArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};


/** A precisely defined action of a persona using the project. */
export type TaskChildTasksListArgs = {
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

/** A condition to be used against `Task` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TaskCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `domainId` field. */
  domainId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `estimate` field. */
  estimate?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `order` field. */
  order?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `parentId` field. */
  parentId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `status` field. */
  status?: InputMaybe<TaskStatus>;
  /** Checks for equality with the object’s `uncertainty` field. */
  uncertainty?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `userStoryId` field. */
  userStoryId?: InputMaybe<Scalars['UUID']>;
};

/** A filter to be used against `Task` object types. All fields are combined with a logical ‘and.’ */
export type TaskFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TaskFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `domainId` field. */
  domainId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `estimate` field. */
  estimate?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TaskFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TaskFilter>>;
  /** Filter by the object’s `order` field. */
  order?: InputMaybe<IntFilter>;
  /** Filter by the object’s `parentId` field. */
  parentId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `status` field. */
  status?: InputMaybe<TaskStatusFilter>;
  /** Filter by the object’s `uncertainty` field. */
  uncertainty?: InputMaybe<IntFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `userStoryId` field. */
  userStoryId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `Task` */
export type TaskInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description: Scalars['String'];
  domainId?: InputMaybe<Scalars['UUID']>;
  estimate: Scalars['Int'];
  id?: InputMaybe<Scalars['UUID']>;
  name: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['UUID']>;
  status?: InputMaybe<TaskStatus>;
  uncertainty: Scalars['Int'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userStoryId: Scalars['UUID'];
};

/** Represents an update to a `Task`. Fields that are set will be updated. */
export type TaskPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  description?: InputMaybe<Scalars['String']>;
  domainId?: InputMaybe<Scalars['UUID']>;
  estimate?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['UUID']>;
  status?: InputMaybe<TaskStatus>;
  uncertainty?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  userStoryId?: InputMaybe<Scalars['UUID']>;
};

export enum TaskStatus {
  /** The task is in the backlog and has not been started. */
  Backlog = 'BACKLOG',
  /** The task is blocked by something else. */
  Blocked = 'BLOCKED',
  /** The task has been deleted. */
  Deleted = 'DELETED',
  /** The task is done. */
  Done = 'DONE',
  /** The task is in progress. */
  InProgress = 'IN_PROGRESS',
  /** The task is in review. */
  Review = 'REVIEW'
}

/** A filter to be used against TaskStatus fields. All fields are combined with a logical ‘and.’ */
export type TaskStatusFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<TaskStatus>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<TaskStatus>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<TaskStatus>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<TaskStatus>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<TaskStatus>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<TaskStatus>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<TaskStatus>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<TaskStatus>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<TaskStatus>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<TaskStatus>>;
};

/** A connection to a list of `Task` values. */
export type TasksConnection = {
  __typename?: 'TasksConnection';
  /** A list of edges which contains the `Task` and cursor to aid in pagination. */
  edges: Array<TasksEdge>;
  /** A list of `Task` objects. */
  nodes: Array<Task>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Task` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Task` edge in the connection. */
export type TasksEdge = {
  __typename?: 'TasksEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Task` at the end of the edge. */
  node: Task;
};

/** Methods to use when ordering `Task`. */
export enum TasksOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DomainIdAsc = 'DOMAIN_ID_ASC',
  DomainIdDesc = 'DOMAIN_ID_DESC',
  EstimateAsc = 'ESTIMATE_ASC',
  EstimateDesc = 'ESTIMATE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  OrderAsc = 'ORDER_ASC',
  OrderDesc = 'ORDER_DESC',
  ParentIdAsc = 'PARENT_ID_ASC',
  ParentIdDesc = 'PARENT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  UncertaintyAsc = 'UNCERTAINTY_ASC',
  UncertaintyDesc = 'UNCERTAINTY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserStoryIdAsc = 'USER_STORY_ID_ASC',
  UserStoryIdDesc = 'USER_STORY_ID_DESC'
}

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['UUID']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['UUID']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['UUID']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['UUID']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['UUID']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['UUID']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['UUID']>>;
};

/** All input for the `updateDomainByNodeId` mutation. */
export type UpdateDomainByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Domain` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Domain` being updated. */
  patch: DomainPatch;
};

/** All input for the `updateDomain` mutation. */
export type UpdateDomainInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Domain` being updated. */
  patch: DomainPatch;
};

/** The output of our update `Domain` mutation. */
export type UpdateDomainPayload = {
  __typename?: 'UpdateDomainPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Domain` that was updated by this mutation. */
  domain?: Maybe<Domain>;
  /** Reads a single `Project` that is related to this `Domain`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `updateEpicByNodeId` mutation. */
export type UpdateEpicByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Epic` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Epic` being updated. */
  patch: EpicPatch;
};

/** All input for the `updateEpic` mutation. */
export type UpdateEpicInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Epic` being updated. */
  patch: EpicPatch;
};

/** The output of our update `Epic` mutation. */
export type UpdateEpicPayload = {
  __typename?: 'UpdateEpicPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Epic` that was updated by this mutation. */
  epic?: Maybe<Epic>;
  /** An edge for our `Epic`. May be used by Relay 1. */
  epicEdge?: Maybe<EpicsEdge>;
  /** Reads a single `Project` that is related to this `Epic`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Epic` mutation. */
export type UpdateEpicPayloadEpicEdgeArgs = {
  orderBy?: InputMaybe<Array<EpicsOrderBy>>;
};

/** All input for the `updateOrganizationByName` mutation. */
export type UpdateOrganizationByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
};

/** All input for the `updateOrganizationByNodeId` mutation. */
export type UpdateOrganizationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Organization` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
};

/** All input for the `updateOrganizationBySlug` mutation. */
export type UpdateOrganizationBySlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
  slug: Scalars['String'];
};

/** All input for the `updateOrganization` mutation. */
export type UpdateOrganizationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Organization` being updated. */
  patch: OrganizationPatch;
};

/** All input for the `updateOrganizationMembershipByNodeId` mutation. */
export type UpdateOrganizationMembershipByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `OrganizationMembership` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `OrganizationMembership` being updated. */
  patch: OrganizationMembershipPatch;
};

/** All input for the `updateOrganizationMembershipByOrganizationIdAndUserId` mutation. */
export type UpdateOrganizationMembershipByOrganizationIdAndUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  /** An object where the defined keys will be set on the `OrganizationMembership` being updated. */
  patch: OrganizationMembershipPatch;
  userId: Scalars['UUID'];
};

/** All input for the `updateOrganizationMembership` mutation. */
export type UpdateOrganizationMembershipInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `OrganizationMembership` being updated. */
  patch: OrganizationMembershipPatch;
};

/** The output of our update `OrganizationMembership` mutation. */
export type UpdateOrganizationMembershipPayload = {
  __typename?: 'UpdateOrganizationMembershipPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Organization` that is related to this `OrganizationMembership`. */
  organization?: Maybe<Organization>;
  /** The `OrganizationMembership` that was updated by this mutation. */
  organizationMembership?: Maybe<OrganizationMembership>;
  /** An edge for our `OrganizationMembership`. May be used by Relay 1. */
  organizationMembershipEdge?: Maybe<OrganizationMembershipsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `OrganizationMembership`. */
  user?: Maybe<User>;
};


/** The output of our update `OrganizationMembership` mutation. */
export type UpdateOrganizationMembershipPayloadOrganizationMembershipEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};

/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayload = {
  __typename?: 'UpdateOrganizationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Organization` that was updated by this mutation. */
  organization?: Maybe<Organization>;
  /** An edge for our `Organization`. May be used by Relay 1. */
  organizationEdge?: Maybe<OrganizationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Organization` mutation. */
export type UpdateOrganizationPayloadOrganizationEdgeArgs = {
  orderBy?: InputMaybe<Array<OrganizationsOrderBy>>;
};

/** All input for the `updatePersonaByNodeId` mutation. */
export type UpdatePersonaByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Persona` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Persona` being updated. */
  patch: PersonaPatch;
};

/** All input for the `updatePersona` mutation. */
export type UpdatePersonaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Persona` being updated. */
  patch: PersonaPatch;
};

/** The output of our update `Persona` mutation. */
export type UpdatePersonaPayload = {
  __typename?: 'UpdatePersonaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Persona` that was updated by this mutation. */
  persona?: Maybe<Persona>;
  /** Reads a single `Project` that is related to this `Persona`. */
  project?: Maybe<Project>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `updateProjectByNodeId` mutation. */
export type UpdateProjectByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Project` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  patch: ProjectPatch;
};

/** All input for the `updateProjectByOrganizationIdAndName` mutation. */
export type UpdateProjectByOrganizationIdAndNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  organizationId: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  patch: ProjectPatch;
};

/** All input for the `updateProjectByOrganizationIdAndSlug` mutation. */
export type UpdateProjectByOrganizationIdAndSlugInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  organizationId: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  patch: ProjectPatch;
  slug: Scalars['String'];
};

/** All input for the `updateProject` mutation. */
export type UpdateProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  patch: ProjectPatch;
};

/** The output of our update `Project` mutation. */
export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Organization` that is related to this `Project`. */
  organization?: Maybe<Organization>;
  /** The `Project` that was updated by this mutation. */
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Project` mutation. */
export type UpdateProjectPayloadProjectEdgeArgs = {
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

/** All input for the `updateTaskByNodeId` mutation. */
export type UpdateTaskByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Task` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Task` being updated. */
  patch: TaskPatch;
};

/** All input for the `updateTask` mutation. */
export type UpdateTaskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Task` being updated. */
  patch: TaskPatch;
};

/** The output of our update `Task` mutation. */
export type UpdateTaskPayload = {
  __typename?: 'UpdateTaskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Domain` that is related to this `Task`. */
  domain?: Maybe<Domain>;
  /** Reads a single `Task` that is related to this `Task`. */
  parent?: Maybe<Task>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Task` that was updated by this mutation. */
  task?: Maybe<Task>;
  /** An edge for our `Task`. May be used by Relay 1. */
  taskEdge?: Maybe<TasksEdge>;
  /** Reads a single `UserStory` that is related to this `Task`. */
  userStory?: Maybe<UserStory>;
};


/** The output of our update `Task` mutation. */
export type UpdateTaskPayloadTaskEdgeArgs = {
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

/** All input for the `updateUserByEmail` mutation. */
export type UpdateUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUserByNodeId` mutation. */
export type UpdateUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** All input for the `updateUserStoryByNodeId` mutation. */
export type UpdateUserStoryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserStory` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `UserStory` being updated. */
  patch: UserStoryPatch;
};

/** All input for the `updateUserStory` mutation. */
export type UpdateUserStoryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `UserStory` being updated. */
  patch: UserStoryPatch;
};

/** The output of our update `UserStory` mutation. */
export type UpdateUserStoryPayload = {
  __typename?: 'UpdateUserStoryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Epic` that is related to this `UserStory`. */
  epic?: Maybe<Epic>;
  /** Reads a single `UserStory` that is related to this `UserStory`. */
  parent?: Maybe<UserStory>;
  /** Reads a single `Persona` that is related to this `UserStory`. */
  personaByAsA?: Maybe<Persona>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `UserStory` that was updated by this mutation. */
  userStory?: Maybe<UserStory>;
  /** An edge for our `UserStory`. May be used by Relay 1. */
  userStoryEdge?: Maybe<UserStoriesEdge>;
};


/** The output of our update `UserStory` mutation. */
export type UpdateUserStoryPayloadUserStoryEdgeArgs = {
  orderBy?: InputMaybe<Array<UserStoriesOrderBy>>;
};

export type User = Node & {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  hasPassword?: Maybe<Scalars['Boolean']>;
  id: Scalars['UUID'];
  isAdmin: Scalars['Boolean'];
  lastname: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `OrganizationMembership`. */
  organizationMemberships: OrganizationMembershipsConnection;
  updatedAt: Scalars['Datetime'];
};


export type UserOrganizationMembershipsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<OrganizationMembershipCondition>;
  filter?: InputMaybe<OrganizationMembershipFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<OrganizationMembershipsOrderBy>>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Filter by the object’s `hasPassword` field. */
  hasPassword?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email: Scalars['String'];
  firstname: Scalars['String'];
  id?: InputMaybe<Scalars['UUID']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  lastname: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  lastname?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `UserStory` values. */
export type UserStoriesConnection = {
  __typename?: 'UserStoriesConnection';
  /** A list of edges which contains the `UserStory` and cursor to aid in pagination. */
  edges: Array<UserStoriesEdge>;
  /** A list of `UserStory` objects. */
  nodes: Array<UserStory>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserStory` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserStory` edge in the connection. */
export type UserStoriesEdge = {
  __typename?: 'UserStoriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserStory` at the end of the edge. */
  node: UserStory;
};

/** Methods to use when ordering `UserStory`. */
export enum UserStoriesOrderBy {
  AsAAsc = 'AS_A_ASC',
  AsADesc = 'AS_A_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EpicIdAsc = 'EPIC_ID_ASC',
  EpicIdDesc = 'EPIC_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  OrderAsc = 'ORDER_ASC',
  OrderDesc = 'ORDER_DESC',
  ParentIdAsc = 'PARENT_ID_ASC',
  ParentIdDesc = 'PARENT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** A precisely defined action of a persona using the project. */
export type UserStory = Node & {
  __typename?: 'UserStory';
  asA?: Maybe<Scalars['UUID']>;
  /** Reads and enables pagination through a set of `UserStory`. */
  childUserStories: UserStoriesConnection;
  /** Reads and enables pagination through a set of `UserStory`. */
  childUserStoriesList: Array<UserStory>;
  comments?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `Epic` that is related to this `UserStory`. */
  epic?: Maybe<Epic>;
  epicId?: Maybe<Scalars['UUID']>;
  iWant: Scalars['String'];
  id: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  order?: Maybe<Scalars['Int']>;
  /** Reads a single `UserStory` that is related to this `UserStory`. */
  parent?: Maybe<UserStory>;
  parentId?: Maybe<Scalars['UUID']>;
  /** Reads a single `Persona` that is related to this `UserStory`. */
  personaByAsA?: Maybe<Persona>;
  soThat?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Task`. */
  tasks: TasksConnection;
  /** Reads and enables pagination through a set of `Task`. */
  tasksList: Array<Task>;
  updatedAt: Scalars['Datetime'];
  validationCriteria?: Maybe<Scalars['String']>;
  variables?: Maybe<Scalars['String']>;
};


/** A precisely defined action of a persona using the project. */
export type UserStoryChildUserStoriesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<UserStoryCondition>;
  filter?: InputMaybe<UserStoryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserStoriesOrderBy>>;
};


/** A precisely defined action of a persona using the project. */
export type UserStoryChildUserStoriesListArgs = {
  condition?: InputMaybe<UserStoryCondition>;
  filter?: InputMaybe<UserStoryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UserStoriesOrderBy>>;
};


/** A precisely defined action of a persona using the project. */
export type UserStoryTasksArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};


/** A precisely defined action of a persona using the project. */
export type UserStoryTasksListArgs = {
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<TasksOrderBy>>;
};

/**
 * A condition to be used against `UserStory` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type UserStoryCondition = {
  /** Checks for equality with the object’s `asA` field. */
  asA?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `epicId` field. */
  epicId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `order` field. */
  order?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `parentId` field. */
  parentId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `UserStory` object types. All fields are combined with a logical ‘and.’ */
export type UserStoryFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserStoryFilter>>;
  /** Filter by the object’s `asA` field. */
  asA?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `epicId` field. */
  epicId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserStoryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserStoryFilter>>;
  /** Filter by the object’s `order` field. */
  order?: InputMaybe<IntFilter>;
  /** Filter by the object’s `parentId` field. */
  parentId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `UserStory` */
export type UserStoryInput = {
  asA?: InputMaybe<Scalars['UUID']>;
  comments?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  epicId?: InputMaybe<Scalars['UUID']>;
  iWant: Scalars['String'];
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['UUID']>;
  soThat?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  validationCriteria?: InputMaybe<Scalars['String']>;
  variables?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `UserStory`. Fields that are set will be updated. */
export type UserStoryPatch = {
  asA?: InputMaybe<Scalars['UUID']>;
  comments?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  epicId?: InputMaybe<Scalars['UUID']>;
  iWant?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  parentId?: InputMaybe<Scalars['UUID']>;
  soThat?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
  validationCriteria?: InputMaybe<Scalars['String']>;
  variables?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node: User;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type DomainFragmentFragment = { __typename?: 'Domain', id: any, name: string, shortName: string, color: string, description?: string | null, projectId: any };

export type EpicFragmentFragment = { __typename?: 'Epic', id: any, name: string, icon?: string | null, description: string, createdAt: any, updatedAt: any };

export type OrganizationFragmentFragment = { __typename?: 'Organization', id: any, name: string, description: string, logoUrl: string, createdAt: any, updatedAt: any };

export type PersonaFragmentFragment = { __typename?: 'Persona', id: any, name: string, shortName: string, description: string, createdAt: any, updatedAt: any };

export type ProjectFragmentFragment = { __typename?: 'Project', id: any, name: string, description: string, createdAt: any, updatedAt: any };

export type TaskFragmentFragment = { __typename?: 'Task', id: any, name: string, description: string, userStoryId: any, estimate: number, uncertainty: number, parentId?: any | null, status?: TaskStatus | null, order?: number | null };

export type UserStoryFragmentFragment = { __typename?: 'UserStory', id: any, name?: string | null, asA?: any | null, iWant: string, soThat?: string | null, validationCriteria?: string | null, variables?: string | null, comments?: string | null, order?: number | null, epicId?: any | null, parentId?: any | null, createdAt: any, updatedAt: any, personaByAsA?: { __typename?: 'Persona', id: any, name: string } | null };

export type CreateDomainMutationVariables = Exact<{
  input: CreateDomainInput;
}>;


export type CreateDomainMutation = { __typename?: 'Mutation', createDomain?: { __typename?: 'CreateDomainPayload', domain?: { __typename?: 'Domain', id: any, name: string, shortName: string, color: string, description?: string | null, projectId: any } | null } | null };

export type DeleteDomainMutationVariables = Exact<{
  input: DeleteDomainInput;
}>;


export type DeleteDomainMutation = { __typename?: 'Mutation', deleteDomain?: { __typename?: 'DeleteDomainPayload', domain?: { __typename?: 'Domain', id: any, name: string, shortName: string, color: string, description?: string | null, projectId: any } | null } | null };

export type UpdateDomainMutationVariables = Exact<{
  input: UpdateDomainInput;
}>;


export type UpdateDomainMutation = { __typename?: 'Mutation', updateDomain?: { __typename?: 'UpdateDomainPayload', domain?: { __typename?: 'Domain', id: any, name: string, shortName: string, color: string, description?: string | null, projectId: any } | null } | null };

export type CreateEpicMutationVariables = Exact<{
  input: CreateEpicInput;
}>;


export type CreateEpicMutation = { __typename?: 'Mutation', createEpic?: { __typename?: 'CreateEpicPayload', epic?: { __typename?: 'Epic', id: any, name: string, icon?: string | null, description: string, createdAt: any, updatedAt: any } | null } | null };

export type DeleteEpicMutationVariables = Exact<{
  input: DeleteEpicInput;
}>;


export type DeleteEpicMutation = { __typename?: 'Mutation', deleteEpic?: { __typename?: 'DeleteEpicPayload', epic?: { __typename?: 'Epic', id: any, name: string, icon?: string | null, description: string, createdAt: any, updatedAt: any } | null } | null };

export type UpdateEpicMutationVariables = Exact<{
  input: UpdateEpicInput;
}>;


export type UpdateEpicMutation = { __typename?: 'Mutation', updateEpic?: { __typename?: 'UpdateEpicPayload', epic?: { __typename?: 'Epic', id: any, name: string, icon?: string | null, description: string, createdAt: any, updatedAt: any } | null } | null };

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization?: { __typename?: 'CreateOrganizationPayload', organization?: { __typename?: 'Organization', id: any } | null } | null };

export type UpdateOrganizationMutationVariables = Exact<{
  input: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization?: { __typename?: 'UpdateOrganizationPayload', organization?: { __typename?: 'Organization', id: any } | null } | null };

export type CreatePersonaMutationVariables = Exact<{
  input: CreatePersonaInput;
}>;


export type CreatePersonaMutation = { __typename?: 'Mutation', createPersona?: { __typename?: 'CreatePersonaPayload', persona?: { __typename?: 'Persona', id: any, name: string, shortName: string, description: string, createdAt: any, updatedAt: any } | null } | null };

export type DeletePersonaMutationVariables = Exact<{
  input: DeletePersonaInput;
}>;


export type DeletePersonaMutation = { __typename?: 'Mutation', deletePersona?: { __typename?: 'DeletePersonaPayload', persona?: { __typename?: 'Persona', id: any, name: string, shortName: string, description: string, createdAt: any, updatedAt: any } | null } | null };

export type UpdatePersonaMutationVariables = Exact<{
  input: UpdatePersonaInput;
}>;


export type UpdatePersonaMutation = { __typename?: 'Mutation', updatePersona?: { __typename?: 'UpdatePersonaPayload', persona?: { __typename?: 'Persona', id: any, name: string, shortName: string, description: string, createdAt: any, updatedAt: any } | null } | null };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'CreateProjectPayload', project?: { __typename?: 'Project', id: any, name: string, description: string, createdAt: any, updatedAt: any } | null } | null };

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask?: { __typename?: 'CreateTaskPayload', task?: { __typename?: 'Task', id: any, name: string, description: string, userStoryId: any, estimate: number, uncertainty: number, parentId?: any | null, status?: TaskStatus | null, order?: number | null } | null } | null };

export type DeleteTaskMutationVariables = Exact<{
  input: DeleteTaskInput;
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: { __typename?: 'DeleteTaskPayload', task?: { __typename?: 'Task', id: any, name: string, description: string, userStoryId: any, estimate: number, uncertainty: number, parentId?: any | null, status?: TaskStatus | null, order?: number | null } | null } | null };

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask?: { __typename?: 'UpdateTaskPayload', task?: { __typename?: 'Task', id: any, name: string, description: string, userStoryId: any, estimate: number, uncertainty: number, parentId?: any | null, status?: TaskStatus | null, order?: number | null } | null } | null };

export type ChangeTaskOrderMutationVariables = Exact<{
  newOrder: Scalars['Int'];
  taskId: Scalars['UUID'];
}>;


export type ChangeTaskOrderMutation = { __typename?: 'Mutation', updateTask?: { __typename?: 'UpdateTaskPayload', task?: { __typename?: 'Task', id: any, name: string, description: string, userStoryId: any, estimate: number, uncertainty: number, parentId?: any | null, status?: TaskStatus | null, order?: number | null } | null } | null };

export type CreateUserStoryMutationVariables = Exact<{
  input: CreateUserStoryInput;
}>;


export type CreateUserStoryMutation = { __typename?: 'Mutation', createUserStory?: { __typename?: 'CreateUserStoryPayload', userStory?: { __typename?: 'UserStory', id: any, name?: string | null, asA?: any | null, iWant: string, soThat?: string | null, validationCriteria?: string | null, variables?: string | null, comments?: string | null, order?: number | null, epicId?: any | null, parentId?: any | null, createdAt: any, updatedAt: any, personaByAsA?: { __typename?: 'Persona', id: any, name: string } | null } | null } | null };

export type DeleteUserStoryMutationVariables = Exact<{
  input: DeleteUserStoryInput;
}>;


export type DeleteUserStoryMutation = { __typename?: 'Mutation', deleteUserStory?: { __typename?: 'DeleteUserStoryPayload', userStory?: { __typename?: 'UserStory', id: any, name?: string | null, asA?: any | null, iWant: string, soThat?: string | null, validationCriteria?: string | null, variables?: string | null, comments?: string | null, order?: number | null, epicId?: any | null, parentId?: any | null, createdAt: any, updatedAt: any, personaByAsA?: { __typename?: 'Persona', id: any, name: string } | null } | null } | null };

export type UpdateUserStoryMutationVariables = Exact<{
  input: UpdateUserStoryInput;
}>;


export type UpdateUserStoryMutation = { __typename?: 'Mutation', updateUserStory?: { __typename?: 'UpdateUserStoryPayload', userStory?: { __typename?: 'UserStory', id: any, name?: string | null, asA?: any | null, iWant: string, soThat?: string | null, validationCriteria?: string | null, variables?: string | null, comments?: string | null, order?: number | null, epicId?: any | null, parentId?: any | null, createdAt: any, updatedAt: any, personaByAsA?: { __typename?: 'Persona', id: any, name: string } | null } | null } | null };

export type GetAllOrganizationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOrganizationQuery = { __typename?: 'Query', organizations?: { __typename?: 'OrganizationsConnection', nodes: Array<{ __typename?: 'Organization', id: any, name: string, description: string, logoUrl: string, createdAt: any, updatedAt: any, projects: { __typename?: 'ProjectsConnection', totalCount: number } }> } | null };

export type GetOrganizationByIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GetOrganizationByIdQuery = { __typename?: 'Query', organization?: { __typename?: 'Organization', id: any, name: string, description: string, logoUrl: string, createdAt: any, updatedAt: any, projects: { __typename?: 'ProjectsConnection', totalCount: number, nodes: Array<{ __typename?: 'Project', id: any, name: string, description: string, createdAt: any, updatedAt: any }> } } | null };

export type GetAllProjectsByOrganizationIdQueryVariables = Exact<{
  organizationId: Scalars['UUID'];
}>;


export type GetAllProjectsByOrganizationIdQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectsConnection', nodes: Array<{ __typename?: 'Project', id: any, name: string, description: string, createdAt: any, updatedAt: any }> } | null };

export type GetProjectByIdQueryVariables = Exact<{
  projectId: Scalars['UUID'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: any, name: string, description: string, createdAt: any, updatedAt: any, domainsList: Array<{ __typename?: 'Domain', id: any, name: string, shortName: string, color: string, description?: string | null, projectId: any }>, personasList: Array<{ __typename?: 'Persona', id: any, name: string, shortName: string, description: string, createdAt: any, updatedAt: any }>, epicsList: Array<{ __typename?: 'Epic', id: any, name: string, icon?: string | null, description: string, createdAt: any, updatedAt: any, userStoriesList: Array<{ __typename?: 'UserStory', id: any, name?: string | null, asA?: any | null, iWant: string, soThat?: string | null, validationCriteria?: string | null, variables?: string | null, comments?: string | null, order?: number | null, epicId?: any | null, parentId?: any | null, createdAt: any, updatedAt: any, tasksList: Array<{ __typename?: 'Task', id: any, name: string, description: string, userStoryId: any, estimate: number, uncertainty: number, parentId?: any | null, status?: TaskStatus | null, order?: number | null, domain?: { __typename?: 'Domain', id: any, name: string, shortName: string, color: string, description?: string | null, projectId: any } | null }>, personaByAsA?: { __typename?: 'Persona', id: any, name: string } | null }> }> } | null };

export type GetProjectBySlugQueryVariables = Exact<{
  projectSlug: Scalars['String'];
  organizationSlug: Scalars['String'];
}>;


export type GetProjectBySlugQuery = { __typename?: 'Query', projectBySlug?: { __typename?: 'Project', id: any, name: string, description: string, createdAt: any, updatedAt: any, organization?: { __typename?: 'Organization', id: any, name: string, description: string, logoUrl: string, createdAt: any, updatedAt: any } | null, domainsList: Array<{ __typename?: 'Domain', id: any, name: string, shortName: string, color: string, description?: string | null, projectId: any }>, personasList: Array<{ __typename?: 'Persona', id: any, name: string, shortName: string, description: string, createdAt: any, updatedAt: any }>, epicsList: Array<{ __typename?: 'Epic', id: any, name: string, icon?: string | null, description: string, createdAt: any, updatedAt: any, userStoriesList: Array<{ __typename?: 'UserStory', id: any, name?: string | null, asA?: any | null, iWant: string, soThat?: string | null, validationCriteria?: string | null, variables?: string | null, comments?: string | null, order?: number | null, epicId?: any | null, parentId?: any | null, createdAt: any, updatedAt: any, tasksList: Array<{ __typename?: 'Task', id: any, name: string, description: string, userStoryId: any, estimate: number, uncertainty: number, parentId?: any | null, status?: TaskStatus | null, order?: number | null, domain?: { __typename?: 'Domain', id: any, name: string, shortName: string, color: string, description?: string | null, projectId: any } | null }>, personaByAsA?: { __typename?: 'Persona', id: any, name: string } | null }> }> } | null };

export const DomainFragmentFragmentDoc = gql`
    fragment DomainFragment on Domain {
  id
  name
  shortName
  color
  description
  projectId
}
    `;
export const EpicFragmentFragmentDoc = gql`
    fragment EpicFragment on Epic {
  id
  name
  icon
  description
  createdAt
  updatedAt
}
    `;
export const OrganizationFragmentFragmentDoc = gql`
    fragment OrganizationFragment on Organization {
  id
  name
  description
  logoUrl
  createdAt
  updatedAt
}
    `;
export const PersonaFragmentFragmentDoc = gql`
    fragment PersonaFragment on Persona {
  id
  name
  shortName
  description
  createdAt
  updatedAt
}
    `;
export const ProjectFragmentFragmentDoc = gql`
    fragment ProjectFragment on Project {
  id
  name
  description
  createdAt
  updatedAt
}
    `;
export const TaskFragmentFragmentDoc = gql`
    fragment TaskFragment on Task {
  id
  name
  description
  userStoryId
  estimate
  uncertainty
  parentId
  status
  order
}
    `;
export const UserStoryFragmentFragmentDoc = gql`
    fragment UserStoryFragment on UserStory {
  id
  name
  asA
  personaByAsA {
    id
    name
  }
  iWant
  soThat
  validationCriteria
  variables
  comments
  order
  epicId
  parentId
  createdAt
  updatedAt
}
    `;
export const CreateDomainDocument = gql`
    mutation CreateDomain($input: CreateDomainInput!) {
  createDomain(input: $input) {
    domain {
      ...DomainFragment
    }
  }
}
    ${DomainFragmentFragmentDoc}`;
export const DeleteDomainDocument = gql`
    mutation DeleteDomain($input: DeleteDomainInput!) {
  deleteDomain(input: $input) {
    domain {
      ...DomainFragment
    }
  }
}
    ${DomainFragmentFragmentDoc}`;
export const UpdateDomainDocument = gql`
    mutation UpdateDomain($input: UpdateDomainInput!) {
  updateDomain(input: $input) {
    domain {
      ...DomainFragment
    }
  }
}
    ${DomainFragmentFragmentDoc}`;
export const CreateEpicDocument = gql`
    mutation CreateEpic($input: CreateEpicInput!) {
  createEpic(input: $input) {
    epic {
      ...EpicFragment
    }
  }
}
    ${EpicFragmentFragmentDoc}`;
export const DeleteEpicDocument = gql`
    mutation DeleteEpic($input: DeleteEpicInput!) {
  deleteEpic(input: $input) {
    epic {
      ...EpicFragment
    }
  }
}
    ${EpicFragmentFragmentDoc}`;
export const UpdateEpicDocument = gql`
    mutation UpdateEpic($input: UpdateEpicInput!) {
  updateEpic(input: $input) {
    epic {
      ...EpicFragment
    }
  }
}
    ${EpicFragmentFragmentDoc}`;
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    organization {
      id
    }
  }
}
    `;
export const UpdateOrganizationDocument = gql`
    mutation UpdateOrganization($input: UpdateOrganizationInput!) {
  updateOrganization(input: $input) {
    organization {
      id
    }
  }
}
    `;
export const CreatePersonaDocument = gql`
    mutation CreatePersona($input: CreatePersonaInput!) {
  createPersona(input: $input) {
    persona {
      ...PersonaFragment
    }
  }
}
    ${PersonaFragmentFragmentDoc}`;
export const DeletePersonaDocument = gql`
    mutation DeletePersona($input: DeletePersonaInput!) {
  deletePersona(input: $input) {
    persona {
      ...PersonaFragment
    }
  }
}
    ${PersonaFragmentFragmentDoc}`;
export const UpdatePersonaDocument = gql`
    mutation UpdatePersona($input: UpdatePersonaInput!) {
  updatePersona(input: $input) {
    persona {
      ...PersonaFragment
    }
  }
}
    ${PersonaFragmentFragmentDoc}`;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    project {
      ...ProjectFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}`;
export const CreateTaskDocument = gql`
    mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    task {
      ...TaskFragment
    }
  }
}
    ${TaskFragmentFragmentDoc}`;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($input: DeleteTaskInput!) {
  deleteTask(input: $input) {
    task {
      ...TaskFragment
    }
  }
}
    ${TaskFragmentFragmentDoc}`;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
    task {
      ...TaskFragment
    }
  }
}
    ${TaskFragmentFragmentDoc}`;
export const ChangeTaskOrderDocument = gql`
    mutation ChangeTaskOrder($newOrder: Int!, $taskId: UUID!) {
  updateTask(input: {id: $taskId, patch: {order: $newOrder}}) {
    task {
      ...TaskFragment
    }
  }
}
    ${TaskFragmentFragmentDoc}`;
export const CreateUserStoryDocument = gql`
    mutation CreateUserStory($input: CreateUserStoryInput!) {
  createUserStory(input: $input) {
    userStory {
      ...UserStoryFragment
    }
  }
}
    ${UserStoryFragmentFragmentDoc}`;
export const DeleteUserStoryDocument = gql`
    mutation DeleteUserStory($input: DeleteUserStoryInput!) {
  deleteUserStory(input: $input) {
    userStory {
      ...UserStoryFragment
    }
  }
}
    ${UserStoryFragmentFragmentDoc}`;
export const UpdateUserStoryDocument = gql`
    mutation UpdateUserStory($input: UpdateUserStoryInput!) {
  updateUserStory(input: $input) {
    userStory {
      ...UserStoryFragment
    }
  }
}
    ${UserStoryFragmentFragmentDoc}`;
export const GetAllOrganizationDocument = gql`
    query GetAllOrganization {
  organizations {
    nodes {
      ...OrganizationFragment
      projects {
        totalCount
      }
    }
  }
}
    ${OrganizationFragmentFragmentDoc}`;
export const GetOrganizationByIdDocument = gql`
    query GetOrganizationById($id: UUID!) {
  organization(id: $id) {
    ...OrganizationFragment
    projects {
      totalCount
      nodes {
        ...ProjectFragment
      }
    }
  }
}
    ${OrganizationFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}`;
export const GetAllProjectsByOrganizationIdDocument = gql`
    query GetAllProjectsByOrganizationId($organizationId: UUID!) {
  projects(
    orderBy: [CREATED_AT_DESC]
    condition: {organizationId: $organizationId}
  ) {
    nodes {
      ...ProjectFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}`;
export const GetProjectByIdDocument = gql`
    query GetProjectById($projectId: UUID!) {
  project(id: $projectId) {
    ...ProjectFragment
    domainsList {
      ...DomainFragment
    }
    personasList {
      ...PersonaFragment
    }
    epicsList(orderBy: [ORDER_ASC]) {
      ...EpicFragment
      userStoriesList(orderBy: [ORDER_ASC]) {
        ...UserStoryFragment
        tasksList(orderBy: [ORDER_ASC]) {
          ...TaskFragment
          domain {
            ...DomainFragment
          }
        }
      }
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${DomainFragmentFragmentDoc}
${PersonaFragmentFragmentDoc}
${EpicFragmentFragmentDoc}
${UserStoryFragmentFragmentDoc}
${TaskFragmentFragmentDoc}`;
export const GetProjectBySlugDocument = gql`
    query GetProjectBySlug($projectSlug: String!, $organizationSlug: String!) {
  projectBySlug(projectSlug: $projectSlug, organizationSlug: $organizationSlug) {
    organization {
      ...OrganizationFragment
    }
    ...ProjectFragment
    domainsList {
      ...DomainFragment
    }
    personasList {
      ...PersonaFragment
    }
    epicsList(orderBy: [ORDER_ASC]) {
      ...EpicFragment
      userStoriesList(orderBy: [ORDER_ASC]) {
        ...UserStoryFragment
        tasksList(orderBy: [ORDER_ASC]) {
          ...TaskFragment
          domain {
            ...DomainFragment
          }
        }
      }
    }
  }
}
    ${OrganizationFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}
${DomainFragmentFragmentDoc}
${PersonaFragmentFragmentDoc}
${EpicFragmentFragmentDoc}
${UserStoryFragmentFragmentDoc}
${TaskFragmentFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateDomain(variables: CreateDomainMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateDomainMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateDomainMutation>(CreateDomainDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateDomain', 'mutation');
    },
    DeleteDomain(variables: DeleteDomainMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteDomainMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteDomainMutation>(DeleteDomainDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteDomain', 'mutation');
    },
    UpdateDomain(variables: UpdateDomainMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateDomainMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateDomainMutation>(UpdateDomainDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateDomain', 'mutation');
    },
    CreateEpic(variables: CreateEpicMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateEpicMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateEpicMutation>(CreateEpicDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateEpic', 'mutation');
    },
    DeleteEpic(variables: DeleteEpicMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteEpicMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteEpicMutation>(DeleteEpicDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteEpic', 'mutation');
    },
    UpdateEpic(variables: UpdateEpicMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateEpicMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateEpicMutation>(UpdateEpicDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateEpic', 'mutation');
    },
    CreateOrganization(variables: CreateOrganizationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateOrganizationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateOrganizationMutation>(CreateOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateOrganization', 'mutation');
    },
    UpdateOrganization(variables: UpdateOrganizationMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateOrganizationMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateOrganizationMutation>(UpdateOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateOrganization', 'mutation');
    },
    CreatePersona(variables: CreatePersonaMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePersonaMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePersonaMutation>(CreatePersonaDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreatePersona', 'mutation');
    },
    DeletePersona(variables: DeletePersonaMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeletePersonaMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeletePersonaMutation>(DeletePersonaDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeletePersona', 'mutation');
    },
    UpdatePersona(variables: UpdatePersonaMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdatePersonaMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePersonaMutation>(UpdatePersonaDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdatePersona', 'mutation');
    },
    CreateProject(variables: CreateProjectMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateProjectMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateProjectMutation>(CreateProjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateProject', 'mutation');
    },
    CreateTask(variables: CreateTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTaskMutation>(CreateTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateTask', 'mutation');
    },
    DeleteTask(variables: DeleteTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTaskMutation>(DeleteTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteTask', 'mutation');
    },
    UpdateTask(variables: UpdateTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTaskMutation>(UpdateTaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateTask', 'mutation');
    },
    ChangeTaskOrder(variables: ChangeTaskOrderMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ChangeTaskOrderMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChangeTaskOrderMutation>(ChangeTaskOrderDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ChangeTaskOrder', 'mutation');
    },
    CreateUserStory(variables: CreateUserStoryMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserStoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserStoryMutation>(CreateUserStoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUserStory', 'mutation');
    },
    DeleteUserStory(variables: DeleteUserStoryMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteUserStoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserStoryMutation>(DeleteUserStoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteUserStory', 'mutation');
    },
    UpdateUserStory(variables: UpdateUserStoryMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateUserStoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserStoryMutation>(UpdateUserStoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateUserStory', 'mutation');
    },
    GetAllOrganization(variables?: GetAllOrganizationQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllOrganizationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllOrganizationQuery>(GetAllOrganizationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllOrganization', 'query');
    },
    GetOrganizationById(variables: GetOrganizationByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetOrganizationByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrganizationByIdQuery>(GetOrganizationByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetOrganizationById', 'query');
    },
    GetAllProjectsByOrganizationId(variables: GetAllProjectsByOrganizationIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllProjectsByOrganizationIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllProjectsByOrganizationIdQuery>(GetAllProjectsByOrganizationIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetAllProjectsByOrganizationId', 'query');
    },
    GetProjectById(variables: GetProjectByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetProjectByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProjectByIdQuery>(GetProjectByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetProjectById', 'query');
    },
    GetProjectBySlug(variables: GetProjectBySlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetProjectBySlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProjectBySlugQuery>(GetProjectBySlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetProjectBySlug', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;