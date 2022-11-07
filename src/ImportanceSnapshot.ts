/*
 * Copyright 2021 SYMBOL
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Importance } from './Importance';
import { ImportanceHeight } from './ImportanceHeight';
import { Serializer } from './Serializer';
import { Utils } from './Utils';

/**
 * Interface to create instances of ImportanceSnapshot
 */
export interface ImportanceSnapshotParams {
    /**
     * account importance
     */
    importance: Importance;
    /**
     * importance height
     */
    height: ImportanceHeight;
}

/**
 * temporal importance information
 */
export class ImportanceSnapshot implements Serializer {
    /**
     * account importance
     */
    public readonly importance: Importance;
    /**
     * importance height
     */
    public readonly height: ImportanceHeight;

    /**
     * Constructor
     * @param importance - account importance
     * @param height - importance height
     */
    constructor({ importance, height }: ImportanceSnapshotParams) {
        this.importance = importance;
        this.height = height;
    }

    /**
     * Creates an instance of ImportanceSnapshot from binary payload
     * @param payload - byte payload to use to serialize the object
     * @returns Creates an instance of ImportanceSnapshot from binary payload
     */
    public static deserialize(payload: Uint8Array): ImportanceSnapshot {
        const byteArray = Array.from(payload);
        const importance = Importance.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, importance.size);
        const height = ImportanceHeight.deserialize(Uint8Array.from(byteArray));
        byteArray.splice(0, height.size);
        return new ImportanceSnapshot({ importance: importance, height: height });
    }

    /**
     * Gets the size of the object
     * @returns Gets the size of the object
     */
    public get size(): number {
        let size = 0;
        size += this.importance.size; // importance;
        size += this.height.size; // height;
        return size;
    }

    /**
     * Serializes an object to bytes
     * @returns Serializes an object to bytes
     */
    public serialize(): Uint8Array {
        let newArray = new Uint8Array();
        const importanceBytes = this.importance.serialize();
        newArray = Utils.concatTypedArrays(newArray, importanceBytes);
        const heightBytes = this.height.serialize();
        newArray = Utils.concatTypedArrays(newArray, heightBytes);
        return newArray;
    }
}
