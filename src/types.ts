export interface Application {
  id?: string;
  fullName: string;
  email: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  hobbies?: string;
  nationBuilding?: string;
  whySvamarga?: string;
  roleId: string;
  roleTitle?: string;
  submittedAt: any; // Using any for Firestore timestamp
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}
