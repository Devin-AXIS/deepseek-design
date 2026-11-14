/** Small file identity shared by the native client and Design host. */
export type DesignDocument = {
  schemaVersion: 2;
  documentId: string;
  entry: string;
  revision?: string;
  tokens?: string;
  tokenFile: string;
  source?: string;
  viewingVersion?: string;
  problem?: string;
};
/** Browser activation order prevents a late request from selecting an older tab. */
export interface DesignActivation {
  client: string;
  sequence: number;
}
