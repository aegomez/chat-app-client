/// ----- Common Interfaces and Types ----- ///

export type ContactStatus = 'accepted' | 'blocked' | 'pending';
export type UserLanguage = 'en' | 'es';

export interface WithSuccess {
  success: boolean;
}

/**
 * A promise that resolves to `{ [K]: { success: boolean } }`
 */
export type SuccessResponse<S extends string> = Promise<Record<S, WithSuccess>>;

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

export type UserProfileResponse = Promise<{
  getUserProfile: WithSuccess & {
    profile: UserSchema;
  };
}>;

/// ----- Users API Mutations ----- ///

// Contacts: Input arguments types
export interface UpdateContactArgs {
  targetId: string;
  newStatus: ContactStatus;
}
// Contacts: Return types
export interface NewContactData {
  profile: PartialUserSchema;
  conversation: string;
}
export type AddContactResponse = Promise<{
  addContact: WithSuccess & NewContactData;
}>;

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
export type CreateGroupResponse = Promise<{
  createGroup: WithSuccess & NewGroupData;
}>;
export type AddMemberResponse = Promise<{
  addGroupMember: WithSuccess & {
    newMember: PartialUserSchema;
  };
}>;
