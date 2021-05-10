import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { testManifest } from './testManifest';
import { ManifestBuilder } from './../core/builders/manifest.builder';
import { Manifest } from './../core/models/manifest';

export class IiifManifestServiceStub {
  public _currentManifest: Subject<Manifest> = new BehaviorSubject<Manifest>(
    new Manifest()
  );
  public _errorMessage = new Subject<string | null>();

  get currentManifest(): Observable<Manifest | null> {
    return this._currentManifest.asObservable();
  }

  get errorMessage(): Observable<string | null> {
    return this._errorMessage.asObservable();
  }

  load(manifestUri: string): void {
    if (manifestUri) {
      const manifest = new ManifestBuilder(testManifest).build();
      if (manifest && manifest.tileSource) {
        this._currentManifest.next(manifest);
      } else {
        this._errorMessage.next('Manifest is not valid');
      }
    } else {
      this._errorMessage.next('ManifestUri is missing');
    }
  }

  resetCurrentManifest() {
    this._currentManifest.next(undefined);
  }

  resetErrorMessage() {
    this._errorMessage.next(undefined);
  }

  destroy(): void {}

  public search(manifest: Manifest, q: string): void {}
}
