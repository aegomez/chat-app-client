/// ----- Common Interfaces and Types ----- ///

export type ContactStatus = 'accepted' | 'blocked' | 'pending';
export type UserLanguage = 'en' | 'es';

interface WithSuccess {
  success: boolean;
}
export type SuccessResponse = Promise<WithSuccess>;

/// ----- Users DB Schemas ----- ///

// Public user properties visible to contacts
interface PartialUserSchema {
  _id: string;
  avatar: string;
  connected: string;
  lastConnection: number;
  publicName: string;
  userName: string;
}

interface GroupSchema {
  _id: string;
  avatar: string;
  conversation: string;
  members: PartialUserSchema[];
  name: string;
}

// Public + private properties
interface UserSchema extends PartialUserSchema {
  _id: never;
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
  WithSuccess & {
    profile: UserSchema;
  }
>;

/// ----- Users API Mutations ----- ///

export type AddContactResponse = Promise<
  WithSuccess & {
    profile: PartialUserSchema;
  }
>;

export type CreatedGroupIds = {
  groupId: string | null;
  conversation: string | null;
};
export type CreateGroupResponse = Promise<WithSuccess & CreatedGroupIds>;
