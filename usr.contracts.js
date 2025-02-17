function scan(ns, parent, server, list) {
    const children = ns.scan(server);
    for (let child of children) {
        if (parent == child) {
            continue;
        }
        list.push(child);
        
        scan(ns, server, child, list);
    }
}

export function list_servers(ns) {
    const list = [];
    scan(ns, '', 'home', list);
    return list;
}

export async function main(ns) {
    const args = ns.flags([["help", false]]);
    if (args.help) {
        ns.tprint("This script helps you find an unsolved coding contract.");
        ns.tprint(`Usage: run ${ns.getScriptName()}`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()}`);
        return;
    }

    let servers = list_servers(ns);
    const boughtServers = ns.getPurchasedServers(ns);
    servers = servers.filter(s => !boughtServers.includes(s));
    servers.filter(server => ns.ls(server).find(f => f.endsWith(".cct"))).forEach(server => ns.tprint(server," : ", ns.ls(server).filter(f => f.endsWith(".cct")).join(", "))); // works
}