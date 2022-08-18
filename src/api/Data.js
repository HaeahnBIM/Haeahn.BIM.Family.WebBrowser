const baseuri = "https://ueapi.haeahn.com/api/RvtCollection/";

const SetRouteLog = async (id_user, before, after, typ) => {
    const postData = {
        ID_USER: id_user,
        BF_PAGE: before,
        AT_PAGE: after,
        TYP: typ
    };
    try {
      const res = await fetch(baseuri + "routelog", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

    } catch (err) {
      console.error(err);
    }
  };

  export default {SetRouteLog}