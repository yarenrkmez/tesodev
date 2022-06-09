/** Data */
import mockData from '../assets/data.json';
/** types */
import { LinksKeys } from '../types/mockDataKeys';

export interface INewLinkPayload {
    nameSurname: string;
    country: string;
    city: string;
    email: string;
}

class LinkServices {
    constructor() {
        const linksFromLocalStorage = localStorage.getItem('links');

        if (!linksFromLocalStorage) {
            localStorage.setItem('links', JSON.stringify(mockData.data));

            this.linkList = mockData.data;
        } else {
            this.linkList = JSON.parse(linksFromLocalStorage);
        }
    }

    private linkList: Array<Array<string>>;

    public getLinks(search: string, page: number = 1, limit: number = 3, orderBy: 'NAME_ASC' | 'NAME_DESC' | 'YEAR_ASC' | 'YEAR_DESC' = 'NAME_ASC'): Array<Array<string>> {
        const filteredDataWithSearch = this.linkList.filter(linkItem => linkItem[LinksKeys.NameSurname].includes(search));

        switch (orderBy) {
            default:
            case 'NAME_ASC':
                filteredDataWithSearch.sort((a: Array<string>, b: Array<string>) => a[LinksKeys.NameSurname].localeCompare(b[LinksKeys.NameSurname]))
                break;
            case 'NAME_DESC':
                filteredDataWithSearch.sort((a: Array<string>, b: Array<string>) => b[LinksKeys.NameSurname].localeCompare(a[LinksKeys.NameSurname]))
                break;
            case 'YEAR_ASC':
                filteredDataWithSearch.sort((a: Array<string>, b: Array<string>) => {
                    const aDate = a[LinksKeys.Date].split('/');
                    const bDate = b[LinksKeys.Date].split('/');

                    const aCurrentDate = new Date([aDate[1], aDate[0], aDate[2]].join('/'));
                    const bCurrentDate = new Date([bDate[1], bDate[0], bDate[2]].join('/'));

                    return aCurrentDate.getTime() - bCurrentDate.getTime();
                });

                break;
            case 'YEAR_DESC':
                filteredDataWithSearch.sort((a: Array<string>, b: Array<string>) => {
                    const aDate = a[LinksKeys.Date].split('/');
                    const bDate = b[LinksKeys.Date].split('/');

                    const aCurrentDate = new Date([aDate[1], aDate[0], aDate[2]].join('/'));
                    const bCurrentDate = new Date([bDate[1], bDate[0], bDate[2]].join('/'));

                    return bCurrentDate.getTime() - aCurrentDate.getTime();
                });
                break;
        }


        const totalPageCount = Math.ceil(filteredDataWithSearch.length / limit);

        const startIndex = (page * limit) - limit;
        const endIndex = startIndex + limit;
        const result = filteredDataWithSearch.slice(startIndex, endIndex);
        const totalData = filteredDataWithSearch.length;
        console.log(totalData);
        // const formated=covertArr.map(item=>
        // (Object.assign({}, item))
        // )


        return result;
    }
    public getTotalLinks(search: string, onePageItemCount: number) {
        const filteredDataWithSearch = this.linkList.filter(linkItem => linkItem[LinksKeys.NameSurname].includes(search));
        const totalData = filteredDataWithSearch.length;
        const totalPage = Math.round(totalData / onePageItemCount);
        return { totalData, totalPage }
    }
    public setNewLink(data: INewLinkPayload) {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }

        if (day.length < 2) {
            day = '0' + day;
        }

        const newLink = {
            ...data,
            date: [day, month, year].join('/'),
            company: 'exmaple'
        };

        this.linkList = [
            ...this.linkList,
            [
                newLink.nameSurname,
                newLink.company,
                newLink.email,
                newLink.date,
                newLink.country,
                newLink.city
            ]
        ];
        localStorage.setItem('links', JSON.stringify(this.linkList));
    }
}

export default new LinkServices();
