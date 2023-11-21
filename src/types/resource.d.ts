import { BasicModel } from "./basic-model"

export type Resource = BasicModel & {
	resourceTableId?: number, //id from Company, Unit or departament
	refTable: RefTable,
	level: number,
	hierarchy: Hierarchy []
}

type Hierarchy = {
    resourceId: number,
    label: string, 
    level: number
}

export enum RefTable {
	company = 'companies',
	unit = 'units',
	departament = 'departaments'
}