/// ----- Common Interfaces and Types ----- ///

export type ContactStatus = 'accepted' | 'blocked' | 'pending';
export type UserLanguage = 'auto' | 'en' | 'es';

// If true, the operation completed succesfully.
// If false, something failed in the resolver, but
// network, cookies, query and data types are correct.
interface WithSuccess {
  success: boolean;
}
// If error === 'NOT_AUTHORIZED', the cookie
// could not be validated.
interface WithError {
  error: string;
}

/**
 * A promise that resolves to `{ [S]: { success: boolean }, error: string }`
 */
export type SuccessResponse<S extends string> = Promise<
  WithError & Record<S, WithSuccess>
>;

/// ----- Users DB Schemas ----- ///

// Public user properties visible to contacts
export interface PartialUserSchema {
  _id: string;
  avatar: string;
  connected: boolean;
  lastConnection: number;
  publicName: string;
  userName: string;
}

export interface GroupSchema {
  _id: string;
  avatar: string;
  conversation: string;
  members: PartialUserSchema[];
  name: string;
}

// Public + private properties
export interface UserSchema extends PartialUserSchema {
  contacts: {
    ref: PartialUserSchema;
    conversation: string;
    status: ContactStatus;
  }[];
  groups: {
    ref: GroupSchema;
    joined: number;
  }[];
  language: UserLanguage;
}

/// ----- Users API Queries ----- ///

export type UserProfileResponse = Promise<
  WithError & {
    getUserProfile: WithSuccess & {
      profile: UserSchema;
    };
  }
>;

/// ----- Users API Mutations ----- ///

// Contacts: Input arguments types
export interface UpdateContactArgs {
  targetId: string;
  newStatus: ContactStatus;
}

// Groups: Input arguments types
export interface CreateGroupArgs {
  name: string;
  avatar: string;
}
export interface UpdateGroupArgs {
  groupId: string;
  userId: string;
}
// Groups: Return types
export interface NewGroupData {
  _id: string;
  conversation: string;
}
export type CreateGroupResponse = Promise<
  WithError & {
    createGroup: WithSuccess & NewGroupData;
  }
>;
export type AddMemberResponse = Promise<
  WithError & {
    addGroupMember: WithSuccess & {
      newMember: PartialUserSchema;
    };
  }
>;
