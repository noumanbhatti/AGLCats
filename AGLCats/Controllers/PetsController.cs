using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Microsoft.Extensions.Logging;
using AGLCats.Models;
using System.Net.Http.Headers;

namespace AGLCats.Controllers
{
    [Produces("application/json")]
    [Route("api/pets")]
    public class PetsController : Controller
    {
        private readonly ILogger _logger;

        public PetsController(ILogger<PetsController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        public async Task<IActionResult> GetAsync(string gender,string pet_type)
        {
            HttpResponseMessage response;
            try
            {
                _logger.LogInformation(LoggingEvent.LIST_ITEMS, "Get List of Pets ");
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    response = await client.GetAsync(new Uri("http://agl-developer-test.azurewebsites.net/people.json"));
                    response.EnsureSuccessStatusCode();

                    var stringResult = await response.Content.ReadAsStringAsync();
                    IEnumerable<Owner> rawData = Newtonsoft.Json.JsonConvert.DeserializeObject<IEnumerable<Owner>>(stringResult);


                    //Return the cats based on gender
                    List<string> cats = rawData.Where(o => o.Gender.ToLower().Equals(gender.Trim().ToLower()) && o.OwnerPets != null)
                        .SelectMany(t=> t.OwnerPets)
                        .Where(p=>p.Type.Trim().ToLower().Equals(pet_type.Trim().ToLower()))
                        .Select(p=> p.Name)
                        .OrderBy(o=>o)
                        .ToList();


                    return Ok(cats);
                }
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(LoggingEvent.LIST_ITEMS, "Exception while getting pets data {0}", ex.ToString());
                return BadRequest("Error in getting pets data" + ex.ToString());
            }
        }
    }
}