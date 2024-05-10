import { IPLicenseTerm, LicenseTerm, RESOURCE_TYPE } from '@/lib/server/types';
import { listResource } from '@/lib/server/sdk';
// import IPAPolicyDataViewerComponent from './IPAPolicyDataViewerComponent';
import PolicyDataViewerComponent from './PolicyDataViewerComponent';

export default async function PolicyDataViewerWrapper({ ipId, ...params }: any) {
  const listReq = {
    pagination: {
      limit: 1000,
      offset: 0,
    },
    where: {
      ipId: ipId,
    },
  };

  const licenseTerm = await listResource(RESOURCE_TYPE.LICENSE_TERMS, listReq);

  let liceseTermData: LicenseTerm[] = licenseTerm.data;

  const ipLicenseTermListRes = await listResource(RESOURCE_TYPE.IP_LICENSE_TERMS, listReq);

  let ipLicenseTermData: IPLicenseTerm[] = ipLicenseTermListRes.data;

  const intersection = liceseTermData.filter((licenseTerm) => {
    return ipLicenseTermData.some((ipLicenseTerm) => ipLicenseTerm.licenseTermsId === licenseTerm.id);
  });

  if (ipLicenseTermData.length < 1) {
    return <div className="w-full pt-8 text-center text-gray-500">No Policies found</div>;
  }

  return <PolicyDataViewerComponent data={intersection} cardOnly {...params} />;
}
