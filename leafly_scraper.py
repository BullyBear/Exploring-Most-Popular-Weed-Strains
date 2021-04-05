from bs4 import BeautifulSoup
import requests
from selenium import webdriver
import pandas as pd
import regex as re
import collections

base_url = 'https://www.leafly.com/strains?sort=name&page='
all_urls = []
DRIVER_PATH = '/Applications/chromedriver'
driver = webdriver.Chrome(executable_path=DRIVER_PATH)
driver.implicitly_wait(1000)
driver.get('https://www.leafly.com/strains?sort=name&page=')
button = driver.find_element_by_id('tou-continue')
# button.click()

for i in range(0, 1):
    button.click()
    for j in range(1, 113):
        j = str(j)
        url = base_url+j
        resp = requests.get(url)
        soup = BeautifulSoup(driver.page_source,'html.parser')
#         print(soup)
        links = soup.findAll('a')
        urls = [link['href'] for link in links if link['href'].startswith('/strains/') and 'lists' not in link['href']]
        all_urls += ['https://www.leafly.com' +strain for strain in urls]
#         print(all_urls)


pd.DataFrame({'url':all_urls}).to_csv('leafly_all_urls.csv')


# driver.quit()



all_urls = list(pd.read_csv('all_urls_leafly.csv')['url'])
# good_urls = []
# bad_urls = []
master_info = []
for url in all_urls:
    info = {}
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, "html5lib")
    base_url = 'https://public.leafly.com/strains/flowers/'
    strain = url.split('strains/', 1)[-1]
    end = '-flower.svg'
    img_url = base_url + strain + end
    info['imgurl'] = img_url
    header = soup.find(class_="text-hero").text
    info['header'] = header
    for herbal in soup.findAll(attrs={'id':'myrcene'}):
        herbal['svg'] = "svg"
    info['herbal'] = herbal
    for peppery in soup.findAll(attrs={'id':'caryophyllene'}):
        peppery['svg'] = "svg"
    info['peppery'] = peppery
    for pine in soup.findAll(attrs={'id':'pinene'}):
        pine['svg'] = "svg"
    info['pine'] = pine
    description = soup.find(class_="strain__description").text
    info['description'] = description
    
    base_url_two = 'https://images.leafly.com/flower-images/'
    strain_two = url.split('strains/', 1)[-1]
    png = '.png'
    jpg = '.jpg'
    img_url_png = base_url_two + strain_two + png
    img_url_jpg = base_url_two + strain_two + jpg
#     regex = soup.find('img', {'srcset': re.compile(r'\.(?:jpg|png)$')})

    img_container = soup.findAll(attrs={'class':'image-container'})
    img_src = soup.findAll(attrs={'class':'max-w-full'})
    for img_url_two in img_src:
        info['img_url_two'] = img_url_two['data-srcset']
#         print(info['img_url_two'])


    
    effects = soup.findAll(class_="mt-lg")[0].text
    if 'Happy' in effects:
        info['strain_two'] = strain_two
        info['effects'] = effects
#         print({'strain_two': strain_two, 'effects': effects})



    review_url = soup.findAll(class_="text-default")[7]['href']
    review_url = str(review_url)
    beginning_url = 'https://www.leafly.com/'
    total_review_url = beginning_url + review_url
#     print(total_review_url)
    resp_url = requests.get(total_review_url)
    soup_url = BeautifulSoup(resp_url.text, "html5lib")
#     review_text = soup_url.findAll('div', {'style':'--initial-container-height: 94px'})
    review_text = soup_url.findAll('div')[48].text
#     print(review_text)
    info['strain_two_review'] = strain_two
    info['review_text'] = review_text
#     print({'strain_two_review': strain_two, 'review_text': review_text})
    
    author_links = soup_url.findAll('a')
    author_urls=[author_link['href'] for author_link in author_links if author_link['href'].startswith('/profile/')]
    info['author_urls'] = author_urls
#     print(info['author_urls'])

    print({'strain_two_review': strain_two, 'author_urls': author_urls, 'review_text': review_text})
    
    

    
    location = soup.findAll('a', {'class':'underline'})
    for hotspot in location:
        if hotspot['href'].startswith('/strains/'):
            info['strain_two'] = strain_two
            info['hotspot'] = hotspot.text
#             print({'strain_two_location': strain_two, 'hotspot': hotspot.text})


    
#             res=[{'strain_two':i, 'hotspot':[k['hotspot'] for k in taco if k['strain_two']==i]} for i in set([p['strain_two'] for p in taco])]
#             print(res)





    master_info.append(info)
#     print(master_info)

    
# df = pd.DataFrame(master_info)
# df.to_csv('master_info_v2.csv')
    

