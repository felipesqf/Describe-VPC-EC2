const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const express = require('express')
const app = express()
const path = require('path');
const router = express.Router();
const port = 3000
dotenv.config();
// Import required AWS SDK clients and commands for Node.js

getServices = () => {
    AWS.config.setPromisesDependency();
    AWS.config.update({
        region: "ap-southeast-2",
    })

    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'})
    var params = {
    DryRun: false
    };
    // Call EC2 to retrieve policy for selected bucket

    ec2.describeVpcs(function(err, datavpc){
        if (err) {
            console.log("Error", err.stack);
        } else {
            ec2.describeInstances(params, function(err, data) {
                if (err) {
                    console.log("Error", err.stack);
                } else {
                    app.get('/', (req, res) => {
                      data.Reservations[data.Reservations.length - 1].Instances[0]
                      res.send(`
                      <h1>VPC</h1>
            
            
                      <table>
                      <tr>
                        <th>Key<th>
                        <th>Value<th>
                      </tr>
                      <tr>
                        <th>CidrBlock<th>
                        <th>${datavpc.Vpcs[datavpc.Vpcs.length - 1].CidrBlock}<th>
                      </tr>
                      <tr>
                        <th>DhcpOptionsId<th>
                        <th>${datavpc.Vpcs[datavpc.Vpcs.length - 1].DhcpOptionsId}<th>
                      </tr>
                      <tr>
                        <th>State<th>
                        <th>${datavpc.Vpcs[datavpc.Vpcs.length - 1].State}<th>
                      </tr>
                      <tr>
                        <th>VpcId<th>
                        <th>${datavpc.Vpcs[datavpc.Vpcs.length - 1].VpcId}<th>
                      </tr>
                      <tr>
                      <th>OwnerId<th>
                      <th>${datavpc.Vpcs[datavpc.Vpcs.length - 1].OwnerId}<th>
                    </tr>
                    <tr>
                      <th>InstanceTenancy<th>
                      <th>${datavpc.Vpcs[datavpc.Vpcs.length - 1].InstanceTenancy}<th>
                    </tr>
                    <tr>
                      <th>Ipv6CidrBlockAssociationSet<th>
                      <th>${datavpc.Vpcs[datavpc.Vpcs.length - 1].Ipv6CidrBlockAssociationSet}<th>
                    </tr>
                    <tr>
                      <th>CidrBlockAssociationSet<th>
                      <th>${datavpc.Vpcs[datavpc.Vpcs.length - 1].CidrBlockAssociationSet}<th>
                    </tr>
                      <tr>
                      </table>
            
            
                      <h1>EC2</h1>
                        <table>
                          <tr>
                            <th>Key<th>
                            <th>Value<th>
                          </tr>
                          <tr>
                            <th>ImageId<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].ImageId}<th>
                          </tr>
                          <tr>
                            <th>Instance Id<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].InstanceId}<th>
                          </tr>
                          <tr>
                            <th>Instance Type<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].InstanceType}<th>
                          </tr>
                          <tr>
                            <th>Key Name<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].KeyName}<th>
                          </tr>
                          <tr>
                            <th>Launch Time<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].LaunchTime}<th>
                          </tr>
                          <tr>
                            <th>Monitoring<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].Monitoring}<th>
                          </tr>
                          <tr>
                            <th>Placement<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].Placement}<th>
                          </tr>
                          <tr>
                          <th>PrivateDnsName<th>
                          <th>${data.Reservations[data.Reservations.length - 1].Instances[0].PrivateDnsName}<th>
                          </tr>
                        <tr>
                            <th>PrivateIpAddress<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].PrivateIpAddress}<th>
                            </tr>
                        <tr>
                            <th>ProductCodes<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].ProductCodes}<th>
                        </tr>
                        <tr>
                            <th>PublicDnsName<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].PublicDnsName}<th>
                        </tr>
                        <tr>
                            <th>PublicIpAddress<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].PublicIpAddress}<th>
                        </tr>
                        <tr>
                            <th>State<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].State}<th>
                        </tr>
                        <tr>
                            <th>StateTransitionReason<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].StateTransitionReason}<th>
                        </tr>
                        <tr>
                            <th>SubnetId<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].SubnetId}<th>
                        </tr>
                        <tr>
                            <th>VpcId<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].VpcId}<th>
                        </tr>
                        <tr>
                            <th>Architecture<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].Architecture}<th>
                        </tr>
                        <tr>
                            <th>BlockDeviceMappings<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].BlockDeviceMappings}<th>
                        </tr>
                        <tr>
                            <th>ClientToken<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].ClientToken}<th>
                        <tr>
                            <th>EbsOptimized<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].EbsOptimized}<th>
                        <tr>
                            <th>EnaSupport<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].EnaSupport}<th>
                        
                        </tr>
                        <tr>
                            <th>Hypervisor<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].Hypervisor}<th>
                        </tr>
                        <tr>
                            <th>IamInstanceProfile<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].IamInstanceProfile}<th>
                        </tr>
                        <tr>
                            <th>ElasticGpuAssociations<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].ElasticGpuAssociations}<th>
                            </tr>
                        <tr>
                            <th>ElasticInferenceAcceleratorAssociations<th>
                            <th> ${data.Reservations[data.Reservations.length - 1].Instances[0].ElasticInferenceAcceleratorAssociations}<th>
                            </tr>
                        <tr>
                            <th>NetworkInterfaces<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].NetworkInterfaces}<th>
                            </tr>
                        <tr>
                            <th>RootDeviceName<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].RootDeviceName}<th>
                            </tr>
                        <tr>
                            <th>RootDeviceType<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].RootDeviceType}<th>
                            </tr>
                        <tr>
                            <th>SecurityGroups<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].SecurityGroups}<th>
                            </tr>
                            <th>SourceDestCheck<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].SourceDestCheck}<th>
                            </tr>
                        <tr>
                            <th>Tags<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].Tags}<th>
                            </tr>
                        <tr>
                            <th>VirtualizationType<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].VirtualizationType}<th>
                            </tr>
                        <tr>
                            <th>CpuOptions<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].CpuOptions}<th>
                            </tr>
                        <tr>
                            <th>CapacityReservationSpecification<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].CapacityReservationSpecification}<th>
                            </tr>
                        <tr>
                            <th>HibernationOptions<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].HibernationOptions}<th>
                            </tr>
                        <tr>
                            <th>Licenses<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].Licenses}<th>
                            </tr>
                        <tr>
                            <th>MetadataOptions<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].MetadataOptions}<th>
                            </tr>
                        <tr>
                            <th>EnclaveOptions<th>
                            <th>${data.Reservations[data.Reservations.length - 1].Instances[0].EnclaveOptions}<th>
                            </tr>
                        </tr>
            
                        </table>
                        `
                        
                        )
                    })
                    console.log("Success", data.Reservations[data.Reservations.length - 1]);
                }
                });
            console.log(datavpc.Vpcs[datavpc.Vpcs.length - 1])
        } 
    })


    
}
getServices();
app.use('/', router);
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})