declare module 'piexifjs' {
    export function load(data: string): any;
    export function dump(exifObj: any): string;
    export function insert(exifData: string, image: string): string;
    export function remove(image: string): string;
    export const TagValues: any;
    export const Tags: any;
    export const GPSIFD: any;
    export const ImageIFD: any;
    export const ExifIFD: any;
    export const InteropIFD: any;
}
