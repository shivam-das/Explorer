import React, {useState} from 'react';

export default function Main() {
    const root = new ListNode('root',null,[]);
    const [currDir, setDir] = useState(root);
    function ListNode(name, parent, children) {
        this.name = name;
        this.parent = parent;
        this.children = children;
    }
    function getFolderView() {
        return currDir.children.map(child => {
            return (
                <div className="folder" onClick={()=>setDir(child)}>
                    <i className="material-icons">folder</i>
                    <h3>{child.name}</h3>
                </div>
            )  
        })
    }

    const createFolderHandler = () => {
        const folderName = prompt("Please enter folder name", "new folder"); 
        if (folderName) {
            const folder = new ListNode(folderName,currDir,[]);
            currDir.children.push(folder);
            setDir({...currDir});
        } 
    };
    const handleBack = () => {
        setDir({...currDir.parent});
    };
    function getPath() {
        const path = [];
        let iterator = {...currDir};
        while(iterator!==null){
            path.unshift(iterator.name);
            iterator = iterator.parent;
        }
        return path.join('  >  ');
    }
    return (
        <>
            <header>
                {currDir.parent && <i className="material-icons" onClick={handleBack}>arrow_back_ios </i>}
                <h1>{getPath()}</h1>
                <span></span>
                <i className="material-icons" onClick={createFolderHandler}>add</i>
            </header>
            <div className="folder-box">
                <div className="folder" onClick={createFolderHandler}>
                    <i className="material-icons">create_new_folder</i>
                </div>
                {getFolderView()}
            </div>
        </>
    );
}