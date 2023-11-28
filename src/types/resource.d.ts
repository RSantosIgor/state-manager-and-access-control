import { BasicModel } from "./basic-model"

export type Resource = BasicModel & {
	resource_table_id?: number, //id from Company, Unit or departament
	ref_table: 'companies' | 'units' | 'departaments',
	level: number,
	hierarchy: Hierarchy []
}

type Hierarchy = {
    resource_id: number,
    label: string, 
    level: number
}

export enum RefTable {
	company = 'companies',
	unit = 'units',
	departament = 'departaments'
}