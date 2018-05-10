import Uuid from 'uuid/v4';

export class UniqueIdentifier {
  static generateUniqueId() {
    return Uuid();
  }
}
